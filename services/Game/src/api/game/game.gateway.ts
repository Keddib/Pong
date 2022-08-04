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
import { AuthService, User } from './auth.service';

import { ClassicGame, DoublePaddle, GoalKeeper } from './modes';

import { assert } from 'console';
import { GameService } from './game.service';

interface UserInput {
  input: string;
  userId: string;
}
interface PlayerJoinedPayload{
  mode : string; // game mode
}
interface AuthenticatedSocket extends Socket {
  user: User;
}

@WebSocketGateway({
  pingTimeout: 7000,
  pingInterval: 1000,
  cors: {
    origin: ['http://localhost','http://localhost:8000'],
    credentials: true,
  },
  async allowRequest(req, fn) {
    const authService: AuthService = new AuthService();
    const user = await authService.isAuthenticated(req.headers.cookie);
    if (!user) return fn(new Error("Unauthorized"), false);
    req.user = user;
    return fn(null, true);
  },
  
})
// @UseGuards(AuthGuard)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    @Inject('GAME_SERVICE') private readonly gameService: GameService,
  ) {}
  private server: Server;
  private logger: Logger = new Logger('AppGateway');

  //game object
  private games: Array<ClassicGame> = Array<ClassicGame>();
  private gameModeToLatestGameIdx: Map<string, number> = new Map<string, number>();
  private userIdToGameIdx: Map<string, number> = new Map<string, number>();
  private socketToUserId: Map<string, string> = new Map<string, string>();
  private userIdToTimeout: Map<string, NodeJS.Timeout> = new Map<
    string,
    NodeJS.Timeout
  >();

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

    const user = (client.request as any).user;
    //console.log(user)
    this.logger.log('Client Connected :' + user.login + " " + client.id);

    const oldSock = this.getByValue(this.socketToUserId, user.uid);
    if (oldSock != undefined) {
      // userId was already connected
      console.log('user ' + user.login + ' has an old socket');
      if (this.userIdToGameIdx.has(user.uid)) {
        console.log('clearing timeout');
        clearTimeout(this.userIdToTimeout.get(user.uid));
        this.userIdToTimeout.delete(user.uid);

        this.games[this.userIdToGameIdx.get(user.uid)].replacePlayer(
          oldSock,
          client.id,
        );
        const g: ClassicGame = this.games[this.userIdToGameIdx.get(user.uid)];
        console.log(
          'user ' + user.login + ' has a game',
          g.state,
          g.players,
        );
        client.join(this.games[this.userIdToGameIdx.get(user.uid)].room);

        const opponent: string =
          g.players[(g.players.indexOf(client.id) + 1) % 2];
        console.log('oponnent', opponent, this.socketToUserId.get(opponent));

        if (this.userIdToTimeout.has(this.socketToUserId.get(opponent))) {
          console.log(
            'user ' +
              user.login +
              ' disconnected and reconnected found oponnent disconnected',
            g.state,
            g.players,
          );
          this.games[this.userIdToGameIdx.get(user.uid)].setState(4);
        } else if (
          this.games[this.userIdToGameIdx.get(user.uid)].done ||
          this.games[this.userIdToGameIdx.get(user.uid)].gameOver()
        ) {
          this.userIdToGameIdx.delete(user.uid);
        } else {
          console.log("rejoin timeout")
          this.userIdToTimeout.set(user.uid, setTimeout(()=>{
            this.games[this.userIdToGameIdx.get(user.uid)].setTimeout(0);
            this.games[this.userIdToGameIdx.get(user.uid)].setState(3);
            this.games[this.userIdToGameIdx.get(user.uid)].init();
          },2000))
        }
      }
    }
    this.socketToUserId.delete(oldSock);
    this.socketToUserId.set(client.id, user.uid);
    client.emit('authenticated');

  }

  async handleDisconnect(client: Socket): Promise<void> {

    this.logger.log('Client Disconnected :' + client.id);

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
        console.log("player left game mode",this.getByValue(this.gameModeToLatestGameIdx, this.userIdToGameIdx.get(userId)))
        this.gameModeToLatestGameIdx.delete(this.getByValue(this.gameModeToLatestGameIdx, this.userIdToGameIdx.get(userId)));
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
        console.log("quit again timeout")

        if(this.userIdToTimeout.has(userId)){
           clearTimeout(this.userIdToTimeout.get(userId));
           console.log("quit again timeout")
        }

        this.userIdToTimeout.set(
          userId,
          setTimeout(async () => {
            if (!this.userIdToGameIdx.has(userId)) {
              console.log('timeout reached but game over');
              this.userIdToGameIdx.delete(userId);
              this.socketToUserId.delete(client.id);
              return;
            }

            let p = this.games[this.userIdToGameIdx.get(userId)].players;
            if(!this.games[this.userIdToGameIdx.get(userId)].winner)
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
            //creating game on db
            await this.gameService.updateGame(client.request.headers.cookie, g.room, 
              {
                scoreOne:g.scores[0],
                scoreTwo:g.scores[1],
                status:1, // done
                winner: (g.winner ? this.socketToUserId.get(g.winner) : null),
              });
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
        const idx = this.userIdToGameIdx.get(userId)
        this.games[idx].setDone(true);

        this.userIdToGameIdx.delete(userId);
        //updating game on db
        await this.gameService.updateGame(client.request.headers.cookie, this.games[idx].room, 
          {
            scoreOne:this.games[idx].scores[0],
            scoreTwo:this.games[idx].scores[1],
            status:1, // done
            winner:(this.games[idx].winner ? this.socketToUserId.get(this.games[idx].winner) : null),
          });
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
  private newGame(server: Server, gameMode: string) : ClassicGame | null{
    switch(gameMode.toLowerCase()){
      case "classic":
        console.log("new Classic")
        return new ClassicGame(server);
      case "doublepaddle":
        console.log("new DoublePaddle")
        return new DoublePaddle(server);
      case "goalkeeper":
        console.log("new GoalKeeper")
        return new GoalKeeper(server);
      default:
        return null;
    }
  }
  @SubscribeMessage('playerJoined')
  async onPlayerJoined(socket: AuthenticatedSocket, payload : PlayerJoinedPayload): Promise<void> {
    // console.log("playerJoined", this.authenticatedSockets, socket.id, this.authenticatedSockets.includes(socket.id));
    const userId = this.socketToUserId.get(socket.id);

    console.log(payload);
    if (this.userIdToGameIdx.has(userId)) {
      if (this.games[this.userIdToGameIdx.get(userId)].mode.toLowerCase() != payload.mode.toLowerCase()){
        let g = this.games[this.userIdToGameIdx.get(userId)]
        let p = g.players;
        if(!this.games[this.userIdToGameIdx.get(userId)].winner)
        this.games[this.userIdToGameIdx.get(userId)].winner =
          p[(p.indexOf(socket.id) + 1) % 2];
        console.log(
          'winner is',
          p[(p.indexOf(socket.id) + 1) % 2],
          p.indexOf(socket.id),
        );

        this.games[this.userIdToGameIdx.get(userId)].setState(4);
        this.games[this.userIdToGameIdx.get(userId)].players = ['-1', '-1']; //.push('-1');
        this.games[this.userIdToGameIdx.get(userId)].setDone(true);
        this.userIdToGameIdx.delete(this.socketToUserId.get(p[0]));
        this.userIdToGameIdx.delete(this.socketToUserId.get(p[1]));

        //creating game on db
        await this.gameService.updateGame(socket.request.headers.cookie, g.room, 
          {
            scoreOne:g.scores[0],
            scoreTwo:g.scores[1],
            status:1, // done
            winner: (g.winner ? this.socketToUserId.get(g.winner) : null),

          });
        //this.socketToUserId.delete(client.id);
        this.userIdToTimeout.delete(userId);
      }
      else return;
    }
    //console.log(socket.user);

    const roomName: string = socket.id;
    console.log(roomName);

    const ltsIdx = this.gameModeToLatestGameIdx.get(payload.mode);

    if (this.games.length) {
      console.log(ltsIdx)
      if (ltsIdx != undefined && this.games[ltsIdx].getPlayers().length < 2) {
        this.games[ltsIdx].addPlayer(socket.id,(socket.request as any).user);
        socket.join(this.games[ltsIdx].room);
        console.log('Joined game idx=' + (ltsIdx), roomName); // not this room
        this.userIdToGameIdx.set(userId, ltsIdx);
        this.gameModeToLatestGameIdx.delete(payload.mode);
        const g = this.games[ltsIdx];

        //creating game on db
        await this.gameService.newGame(socket.request.headers.cookie, 
          {
            gameId:g.room,
            mode:(g.mode as "classic" | "doublepaddle" | "goalkeeper"),
            playerOne:g.playerData[0].uid,
            playerTwo:g.playerData[1].uid,
            scoreOne:0,
            scoreTwo:0,
            status:0,
          });

      } else {
        const g = this.newGame(this.server, payload.mode)
        if(!g)return 

        this.games.push(g);
        this.games[this.games.length - 1].addPlayer(socket.id,(socket.request as any).user);
        this.games[this.games.length - 1].setRoomName(roomName);
        socket.join(roomName);
        console.log('Created game idx=' + (this.games.length - 1), roomName);

        this.userIdToGameIdx.set(userId, this.games.length - 1);
        this.gameModeToLatestGameIdx.set(payload.mode, this.games.length - 1);


      }
    } else {
      const g = this.newGame(this.server, payload.mode)
      if(!g)return

      this.games.push(g);
      this.games[0].addPlayer(socket.id,(socket.request as any).user);
      this.games[0].setRoomName(roomName);
      socket.join(roomName);
      console.log('created game idx=' + 0, roomName);
      this.gameModeToLatestGameIdx.set(payload.mode, this.games.length - 1)
      this.userIdToGameIdx.set(userId, this.games.length - 1);
    }

    //this.userIdToGameIdx.set(userId, this.games.length - 1);
  }

  @SubscribeMessage('playerInput')
  handlePlayerInput(client: Socket, payload: UserInput): void {
    const userId = this.socketToUserId.get(client.id);
    const g: ClassicGame = this.games[this.userIdToGameIdx.get(userId)];
    if (!g.state) return;
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
