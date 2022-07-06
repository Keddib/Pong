import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse
} from '@nestjs/websockets';
import { Logger } from "@nestjs/common"
import { Socket, Server } from "socket.io"

const min = (a: number, b: number) => {
  return a < b ? a : b;
}
const max = (a: number, b: number) => {
  return a > b ? a : b;
}
interface UserInput {
  input: string;
  userId: string;
}

interface Game {
  server: Server;

  //Constants
  aspectRatio: number;
  width: number;
  height: number;

  initBallX: number;
  initBallY: number;
  ballRadius: number;
  ballSpeed: number;

  paddleWidth: number;
  paddleHeight: number;
  paddleSpeed: number;

  // Game variables
  ballX: number;
  ballY: number;
  ballDirX: number;
  ballDirY: number;

  paddleOneX: number;
  paddleOneY: number;

  paddleTwoX: number;
  paddleTwoY: number;

  loop: NodeJS.Timer;

  state: 0 | 1 | 2;
  players: Array<string>
  room: string;
}

interface GameState {
  // Game variables
  ballX: number;
  ballY: number;
  ballDirX: number;
  ballDirY: number;

  paddleOneX: number;
  paddleOneY: number;

  paddleTwoX: number;
  paddleTwoY: number;

  state: 0 | 1 | 2;
  players: Array<string>;
}

/**
 * TODO:
 * 3 game modes
 * aspect ratio : 2 / 3
 * height = aspect ratio * width
 * 
 * absolute width 1000;
 * relative width 100%
 * 
 * absolute X = 720
 * relative X = 720 / absolute width * 100
 */ 

class Game {

  constructor(server: Server) {
    this.server = server;

    
    this.aspectRatio = 16/9
    this.width = 1000;


    this.height = this.width / this.aspectRatio;

    this.initBallX = this.width / 2;
    this.initBallY = this.height / 2;
    this.ballRadius = 50;
    this.ballSpeed = 10;

    this.paddleWidth = 30;
    this.paddleHeight = 150;
    this.paddleSpeed = 10;

    // Game variables
    this.ballX = this.initBallX;
    this.ballY = this.initBallY;
    this.ballDirX = 1;
    this.ballDirY = 1;

    this.paddleOneX = 0;
    this.paddleOneY = 0;

    this.paddleTwoX = this.width - this.paddleWidth;
    this.paddleTwoY = 0;

    this.state = 0

    this.players = [];
    this.room = ""
    //this.run();
  }

  cleanup(): void {
    this.emitState();
    clearInterval(this.loop);
  }

  getPlayers(): Array<string> { return this.players }
  addPlayer(id: string): void {
    if (this.players.length < 2)
      this.players.push(id)
    if (this.players.length === 2) {
      this.run();
      this.toggleGameState();
    }
  }
  setRoomName(name: string): void { this.room = name; }
  toggleGameState(): void {
    this.state = (this.state === 0 ? 1 : 2)
    if (this.state === 2) this.cleanup();
  }
  getGameState(): GameState {
    return {
      ballX: this.ballX,
      ballY: this.ballY,
      ballDirX: this.ballDirX,
      ballDirY: this.ballDirY,

      paddleOneX: this.paddleOneX,
      paddleOneY: this.paddleOneY,

      paddleTwoX: this.paddleTwoX,
      paddleTwoY: this.paddleTwoY,

      state: this.state,
      players: this.players
    }
  }
  async emitState() {
    this.server.to(this.room).emit("gameState", this.getGameState());
  }
  async run() {
    const fps = 60;
    this.loop = setInterval(() => {
      this.updateBall();
      this.handlePaddleOneBounce();
      this.handlePaddleTwoBounce();
      this.emitState();
    }, 1000 / fps);
  }
  updateBall() {
    //update
    this.ballX += this.ballSpeed * this.ballDirX;
    this.ballY += this.ballSpeed * this.ballDirY;

    //no overlap ?
    if (this.ballDirX > 0)
      this.ballX = min(this.ballX, this.width - this.ballRadius / 2);
    else
      this.ballX = max(this.ballX, this.ballRadius / 2);
    if (this.ballDirY > 0)
      this.ballY = min(this.ballY, this.height - this.ballRadius / 2);
    else
      this.ballY = max(this.ballY, this.ballRadius / 2);

    //collision
    if (this.ballX + this.ballRadius / 2 >= this.width || this.ballX - this.ballRadius / 2 <= 0)
      this.ballDirX *= -1;
    if (this.ballY + this.ballRadius / 2 >= this.height || this.ballY - this.ballRadius / 2 <= 0)
      this.ballDirY *= -1;
  }
  updatePaddleOne(dir: string) {

    if (dir === "DOWN") {
      this.paddleOneY += this.paddleSpeed;
      this.paddleOneY = min(this.paddleOneY, this.height - this.paddleHeight);
    }
    else {
      this.paddleOneY -= this.paddleSpeed;
      this.paddleOneY = max(this.paddleOneY, 0);
    }
  }
  updatePaddleTwo(dir: string) {

    if (dir === "DOWN") {
      this.paddleTwoY += this.paddleSpeed;
      this.paddleTwoY = min(this.paddleTwoY, this.height - this.paddleHeight);
    }
    else {
      this.paddleTwoY -= this.paddleSpeed;
      this.paddleTwoY = max(this.paddleTwoY, 0);
    }
  }
  handlePaddleOneBounce() {

    if (
      this.ballDirX === -1
      && this.ballY > this.paddleOneY
      && this.ballY < this.paddleOneY + this.paddleHeight // ball in front of paddle and going toward paddle
    ) {
      // console.log("in paddle one range")
      this.ballX = max(this.ballX, this.ballRadius / 2 + this.paddleWidth);
      if (this.ballX - this.ballRadius / 2 - this.paddleWidth <= 0)
        this.ballDirX *= -1;
    }
  }
  handlePaddleTwoBounce() {

    if (
      this.ballDirX === 1
      && this.ballY > this.paddleTwoY
      && this.ballY < this.paddleTwoY + this.paddleHeight // ball in front of paddle and going toward paddle
    ) {
      // console.log("in paddle two range")

      this.ballX = min(this.ballX, this.width - this.ballRadius / 2 - this.paddleWidth);

      if (this.ballX + this.ballRadius / 2 + this.paddleWidth >= this.width)
        this.ballDirX *= -1;
    }
  }
  handleInput(payload: UserInput) {
    if (payload.userId === this.players[0])
      this.updatePaddleOne(payload.input);
    else
      this.updatePaddleTwo(payload.input);
  }
}

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    },
  }
)
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private server: Server;
  private logger: Logger = new Logger("AppGateway");

  //game object
  private games: Array<Game> = Array<Game>();
  private playerToGameIdx: Map<string, number> = new Map<string, number>();

  afterInit(server: Server): void {
    this.server = server;
    this.logger.log("Init");
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log("Client Connected :" + client.id);

  }
  handleDisconnect(client: Socket): void {
    this.logger.log("Client Disconnected :" + client.id);

    if (this.playerToGameIdx.has(client.id)) {
      console.log("game idx ", this.playerToGameIdx.get(client.id))
      this.games[this.playerToGameIdx.get(client.id)].toggleGameState()
      //this.games.slice(this.playerToGameIdx.get(client.id), 1);
      this.playerToGameIdx.delete(client.id);
    }
  }

  @SubscribeMessage('playerJoined')
  joinRoom(socket: Socket): void {
    const roomName: string = socket.id;
    console.log(roomName)
    if (this.playerToGameIdx.has(socket.id)) {
      console.log(this.games[this.playerToGameIdx[socket.id]].getPlayers())
      if (this.games[this.playerToGameIdx[socket.id]].getPlayers().length == 2)
        this.games[this.playerToGameIdx[socket.id]].toggleGameState()
      return;
    }

    if (this.games.length) {
      if (this.games[this.games.length - 1].getPlayers().length < 2) {
        this.games[this.games.length - 1].addPlayer(socket.id);
        socket.join(this.games[this.games.length - 1].room);
        console.log("Joined game idx=" + (this.games.length - 1), roomName); // not this room
      }
      else {
        this.games.push(new Game(this.server));
        this.games[this.games.length - 1].addPlayer(socket.id);
        this.games[this.games.length - 1].setRoomName(roomName);
        socket.join(roomName);
        console.log("Created game idx=" + (this.games.length - 1), roomName)
      }
    }
    else {
      this.games.push(new Game(this.server));
      this.games[0].addPlayer(socket.id);
      this.games[0].setRoomName(roomName);
      socket.join(roomName);
      console.log("created game idx=" + 0, roomName)
    }

    this.playerToGameIdx.set(socket.id, this.games.length - 1);
  }

  @SubscribeMessage('playerInput')
  handlePlayerInput(client: Socket, payload: UserInput): void {

    this.games[this.playerToGameIdx.get(client.id)].handleInput({ ...payload, userId: client.id })

    //this.logger.log("Player One going " + payload.input + " new y =" + this.game.paddleOneY)

    //this.server.emit("msgToClient", payload);
  }
}
