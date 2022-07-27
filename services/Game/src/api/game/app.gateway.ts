import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthGuard } from './app.guard';
import { AuthService, User } from './app.service';

import { ClassicGame } from './modes';

interface UserInput {
  input: string;
  userId: string;
}
interface AuthenticatedSocket extends Socket {
  user: User;
}

@WebSocketGateway({
  pingTimeout: 7000,
  pingInterval: 1000,
  cors: {
    origin: 'http://localhost',
    credentials: true,
  },
})
// @UseGuards(AuthGuard)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}
  private server: Server;
  private logger: Logger = new Logger('AppGateway');

  //game object
  private games: Array<ClassicGame> = Array<ClassicGame>();
  private userIdToGameIdx: Map<string, number> = new Map<string, number>();
  private socketToUserId: Map<string, string> = new Map<string, string>();
  private userIdToTimeout: Map<string, NodeJS.Timeout> = new Map<
    string,
    NodeJS.Timeout
  >();
  private authenticatedSockets: Array<string> = Array<string>();

  afterInit(server: Server): void {
    this.server = server;
    this.logger.log('Init');
  }

  private getByValue(map, searchValue) {
    for (const [key, value] of map.entries()) {
      if (value === searchValue) return key;
    }
    return undefined;
  }

  async handleConnection(client: Socket): Promise<void> {
    const cookie = client.handshake.headers.cookie;
    const user = await this.authService.isAuthenticated(cookie);
    if (!user) return client.conn.close(true);

    this.logger.log('Client Connected :' + user.username, client.id);

    this.authenticatedSockets.push(client.id);
    const oldSock = this.getByValue(this.socketToUserId, user.ftId);
    if (oldSock != undefined) {
      // userId was already connected
      console.log('user ' + user.username + ' has an old socket');
      if (this.userIdToGameIdx.has(user.ftId)) {
        console.log('clearing timeout');
        clearTimeout(this.userIdToTimeout.get(user.ftId));
        this.userIdToTimeout.delete(user.ftId);

        this.games[this.userIdToGameIdx.get(user.ftId)].replacePlayer(
          oldSock,
          client.id,
        );
        const g: ClassicGame = this.games[this.userIdToGameIdx.get(user.ftId)];

        console.log(
          'user ' + user.username + ' has a game',
          g.state,
          g.players,
        );
        client.join(this.games[this.userIdToGameIdx.get(user.ftId)].room);

        const opponent: string =
          g.players[(g.players.indexOf(client.id) + 1) % 2];
        console.log('oponnent', opponent, this.socketToUserId.get(opponent));

        if (this.userIdToTimeout.has(this.socketToUserId.get(opponent))) {
          console.log(
            'user ' +
              user.username +
              ' disconnected and reconnected found oponnent disconnected',
            g.state,
            g.players,
          );
          this.games[this.userIdToGameIdx.get(user.ftId)].setState(4);
        } else if (
          this.games[this.userIdToGameIdx.get(user.ftId)].done ||
          this.games[this.userIdToGameIdx.get(user.ftId)].gameOver()
        ) {
          this.userIdToGameIdx.delete(user.ftId);
        } else {
          this.games[this.userIdToGameIdx.get(user.ftId)].setTimeout(0);
          this.games[this.userIdToGameIdx.get(user.ftId)].setState(3);
          this.games[this.userIdToGameIdx.get(user.ftId)].init();
        }
      }
    }
    this.socketToUserId.delete(oldSock);
    this.socketToUserId.set(client.id, user.ftId);
    client.emit('authenticated');

    console.log('authenticated sockets', this.authenticatedSockets.length);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    if (!this.authenticatedSockets.includes(client.id)) return;
    this.authenticatedSockets.splice(
      this.authenticatedSockets.indexOf(client.id),
      1,
    );

    this.logger.log('Client Disconnected :' + client.id);
    console.log('authenticated sockets', this.authenticatedSockets.length);

    const userId = this.socketToUserId.get(client.id);
    if (this.userIdToGameIdx.has(userId)) {
      console.log('game idx ', this.userIdToGameIdx.get(userId));
      if (
        this.games[this.userIdToGameIdx.get(userId)].getPlayers().length < 2
      ) {
        this.games[this.userIdToGameIdx.get(userId)].players = ['-1', '-1']; //.push('-1');
        this.games[this.userIdToGameIdx.get(userId)].setState(4);
        this.userIdToGameIdx.delete(userId);
        this.socketToUserId.delete(client.id);
      } else if (
        !(
          this.games[this.userIdToGameIdx.get(userId)].done ||
          this.games[this.userIdToGameIdx.get(userId)].gameOver()
        )
      ) {
        // two players in
        console.log('player left a game with two players ');

        const g: ClassicGame = this.games[this.userIdToGameIdx.get(userId)];
        console.log('user has a game', g.state, g.players);

        this.games[this.userIdToGameIdx.get(userId)].setState(4);

        //setting timeout
        this.games[this.userIdToGameIdx.get(userId)].setTimeout(Date.now());
        const timeoutPeriod = g.timeoutPeriodInSeconds * 1e3;
        this.userIdToTimeout.set(
          userId,
          setTimeout(() => {
            if (!this.userIdToGameIdx.has(userId)) {
              console.log('timeout reached but game over');
              this.userIdToGameIdx.delete(userId);
              this.socketToUserId.delete(client.id);
              return;
            }

            let p = this.games[this.userIdToGameIdx.get(userId)].players;

            this.games[this.userIdToGameIdx.get(userId)].winner =
              p[(p.indexOf(client.id) + 1) % 2];
            console.log(
              'winner is',
              p[(p.indexOf(client.id) + 1) % 2],
              p.indexOf(client.id),
            );

            this.games[this.userIdToGameIdx.get(userId)].setState(4);
            this.games[this.userIdToGameIdx.get(userId)].players = ['-1', '-1']; //.push('-1');
            this.games[this.userIdToGameIdx.get(userId)].setDone(true);
            this.userIdToGameIdx.delete(this.socketToUserId.get(p[0]));
            this.userIdToGameIdx.delete(this.socketToUserId.get(p[1]));

            //this.socketToUserId.delete(client.id);
            this.userIdToTimeout.delete(userId);
            // this.games[this.userIdToGameIdx.get(userId)].setTimeout(userId, false);
            console.log('timeout reached');
            if (this.userIdToGameIdx.size === 0) {
              this.userIdToGameIdx.clear();
              this.games.splice(0, this.games.length);
              this.userIdToTimeout.clear();
              this.socketToUserId.clear();
              console.log('cleared everything');
            }
          }, timeoutPeriod),
        );
        //this.userIdToGameIdx.delete(userId);
      } else {
        this.games[this.userIdToGameIdx.get(userId)].setDone(true);
        this.userIdToGameIdx.delete(userId);
      }
    }

    if (this.userIdToGameIdx.size === 0) {
      this.userIdToGameIdx.clear();
      this.games.splice(0, this.games.length);
      this.userIdToTimeout.clear();
      this.socketToUserId.clear();
      console.log('cleared everything');
    }
  }

  @SubscribeMessage('playerJoined')
  joinRoom(socket: AuthenticatedSocket): void {
    // console.log("playerJoined", this.authenticatedSockets, socket.id, this.authenticatedSockets.includes(socket.id));
    if (!this.authenticatedSockets.includes(socket.id)) return;
    const userId = this.socketToUserId.get(socket.id);

    if (this.userIdToGameIdx.has(userId)) {
      return;
    }
    //console.log(socket.user);

    const roomName: string = socket.id;
    console.log(roomName);

    // if (this.userIdToGameIdx.has(socket.id)) {
    //   console.log(this.games[this.userIdToGameIdx[socket.id]].getPlayers());
    //   if (this.games[this.userIdToGameIdx[socket.id]].getPlayers().length == 2)
    //     this.games[this.userIdToGameIdx[socket.id]].toggleGameState();
    //   return;
    // }

    if (this.games.length) {
      if (this.games[this.games.length - 1].getPlayers().length < 2) {
        this.games[this.games.length - 1].addPlayer(socket.id);
        socket.join(this.games[this.games.length - 1].room);
        console.log('Joined game idx=' + (this.games.length - 1), roomName); // not this room
      } else {
        this.games.push(new ClassicGame(this.server));
        this.games[this.games.length - 1].addPlayer(socket.id);
        this.games[this.games.length - 1].setRoomName(roomName);
        socket.join(roomName);
        console.log('Created game idx=' + (this.games.length - 1), roomName);
      }
    } else {
      this.games.push(new ClassicGame(this.server));
      this.games[0].addPlayer(socket.id);
      this.games[0].setRoomName(roomName);
      socket.join(roomName);
      console.log('created game idx=' + 0, roomName);
    }

    this.userIdToGameIdx.set(userId, this.games.length - 1);
  }

  @SubscribeMessage('playerInput')
  handlePlayerInput(client: Socket, payload: UserInput): void {
    const userId = this.socketToUserId.get(client.id);
    const g: ClassicGame = this.games[this.userIdToGameIdx.get(userId)];
    if (g.state === 3) {
      const totalGoals = g.scores[0] + g.scores[1];
      if (client.id === g.players[totalGoals % 2])
        this.games[this.userIdToGameIdx.get(userId)].setState(2);
    }
    // if (g.state === 2)
    this.games[this.userIdToGameIdx.get(userId)].handleInput({
      ...payload,
      userId: client.id,
    });
  }
}
