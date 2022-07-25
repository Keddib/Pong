import { Server } from 'socket.io';

const min = (a: number, b: number) => {
  return a < b ? a : b;
};
const max = (a: number, b: number) => {
  return a > b ? a : b;
};
interface UserInput {
  input: string;
  userId: string;
}

export class Game {
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

  state: 0 | 1 | 2 | 3 | 4;
  /*
  0 // queue mode 
  1 // waiting for player to start 
  2   // playing 
        // player left (timeout before forfait)
  3   // outcome + ( next round(waiting for player to start) || ?? )
        // player doesnt start next round (timeout before forfait)
  4 // final outcome 
      // play again (back to queue)
      // ask for rematch ?? if still there 

  */
  players: Array<string>;
  scores: Array<number>;
  maxScore: number;

  room: string;

  done : boolean;
  timeout : number; // for no timeout // time player left game 
  timeoutPeriodInSeconds : number; // for no timeout // time player left game 

  winner : string | undefined;
}

interface GameState {
  // Window dimensions
  aspectRatio: number;
  width: number;
  height: number;

  //ball
  ballX: number;
  ballY: number;
  ballDirX: number;
  ballDirY: number;
  ballSpeed: number;
  ballRadius: number;

  //paddle
  paddleWidth: number;
  paddleHeight: number;
  paddleSpeed: number;
  paddleOneX: number;
  paddleOneY: number;
  paddleTwoX: number;
  paddleTwoY: number;

  state: 0 | 1 | 2 | 3 | 4;

  scores: Array<number>;
  maxScore : number;
  players: Array<string>;
  timestamp: number;

  done: boolean;

  winner : string;

}

export class ClassicGame extends Game {
  constructor(server: Server) {
    super();

    this.server = server;

    this.aspectRatio = 16 / 9;
    this.width = 1000;
    this.height = this.width / this.aspectRatio;

    this.initBallX = this.width / 2;
    this.initBallY = this.height / 2;
    this.ballRadius = 50;
    this.ballSpeed = 10;
    this.ballX = this.initBallX;
    this.ballY = this.initBallY;
    this.ballDirX = -1;
    this.ballDirY = -1;

    this.paddleWidth = 30;
    this.paddleHeight = 800;
    this.paddleSpeed = 5;
    this.paddleOneX = 0;
    this.paddleOneY = 0;
    this.paddleTwoX = this.width - this.paddleWidth;
    this.paddleTwoY = 0;

    this.state = 0;

    this.players = [];
    this.scores = [0, 0];
    this.maxScore = 3;
    this.room = '';

    this.done = false;
    this.timeout = 0;
    this.timeoutPeriodInSeconds = 5; 

    this.winner = "";
    //this.run();
  }
  init() {
    this.ballX = this.initBallX;
    this.ballY = this.initBallY;

    const totalGoals = this.scores[0] + this.scores[1];
    this.ballDirX = totalGoals % 2 ? 1 : -1;
    this.ballDirY = -1;

    this.paddleOneX = 0;
    this.paddleOneY = 0;

    this.paddleTwoX = this.width - this.paddleWidth;
    this.paddleTwoY = 0;
  }
  cleanup(): void {
    this.emitState();
    clearInterval(this.loop);
  }
  setDone(d: boolean){
    this.done = d;
  }
  setTimeout(userId: string, v: boolean){
    const idx = this.players.indexOf(userId);
    this.timeout[idx] = v;
  }
  getPlayers(): Array<string> {
    return this.players;
  }
  addPlayer(id: string): void {
    if (this.players.length < 2) this.players.push(id);
    if (this.players.length === 2) {
      this.state = 3; // state between rounds
      this.run();
    }
  }
  setRoomName(name: string): void {
    this.room = name;
  }
  setState(st: 0 | 1 | 2 | 3 | 4): void {
    this.state = st;
  }
  getGameState(): GameState {
    return {
      aspectRatio: this.aspectRatio,

      width: this.width,
      height: this.height,

      ballX: this.ballX,
      ballY: this.ballY,
      ballDirX: this.ballDirX,
      ballDirY: this.ballDirY,
      ballSpeed: this.ballSpeed,
      ballRadius: this.ballRadius,
      paddleOneX: this.paddleOneX,
      paddleOneY: this.paddleOneY,
      paddleTwoX: this.paddleTwoX,
      paddleTwoY: this.paddleTwoY,
      paddleWidth: this.paddleWidth,
      paddleHeight: this.paddleHeight,
      paddleSpeed: this.paddleSpeed,

      state: this.state,
      players: this.players,
      scores: this.scores,
      maxScore : this.maxScore,
      timestamp: Date.now(),

      done: this.done,
      winner : this.winner,
    };
  }
  async emitState() {
    this.server.to(this.room).emit('gameState', this.getGameState());
  }
  async run() {
    const fps = 60;
    this.loop = setInterval(() => {
      if (this.state === 2) {
        this.updateBall();
        this.handlePaddleOneBounce();
        this.handlePaddleTwoBounce();
      }

      this.emitState();
    }, 1000 / fps);
  }
  replacePlayer(oldSock: string, newSock: string){
    const idx = this.players.indexOf(oldSock);
    // console.log("old sock ", oldSock, "new sock " , newSock, idx)
    this.players[idx] = newSock;
  }
  gameOver(): boolean {
    return this.scores.includes(this.maxScore);
  }
  updateBall() {
    //update
    this.ballX += this.ballSpeed * this.ballDirX;
    this.ballY += this.ballSpeed * this.ballDirY;

    //no overlap ?
    if (this.ballDirX > 0)
      this.ballX = min(this.ballX, this.width - this.ballRadius / 2);
    else this.ballX = max(this.ballX, this.ballRadius / 2);
    if (this.ballDirY > 0)
      this.ballY = min(this.ballY, this.height - this.ballRadius / 2);
    else this.ballY = max(this.ballY, this.ballRadius / 2);

    //collision
    if (
      this.ballX + this.ballRadius / 2 >= this.width ||
      this.ballX - this.ballRadius / 2 <= 0
    ) {
      this.ballDirX *= -1;

      if (this.ballX + this.ballRadius / 2 >= this.width) this.scores[0] += 1; // +1 playerOne
      if (this.ballX - this.ballRadius / 2 <= 0) this.scores[1] += 1; // +1 playerTwo
      if (!this.gameOver()) {
        this.state = 3; // waiting for player to start the game
        this.init();
      } else this.state = 4; // final outcome

      //this.cleanup(); // pause loop
    }
    if (
      this.ballY + this.ballRadius / 2 >= this.height ||
      this.ballY - this.ballRadius / 2 <= 0
    )
      this.ballDirY *= -1;
  }
  updatePaddleOne(dir: string) {
    if (dir === 'DOWN') {
      this.paddleOneY += this.paddleSpeed;
      this.paddleOneY = min(this.paddleOneY, this.height - this.paddleHeight);
    } else {
      this.paddleOneY -= this.paddleSpeed;
      this.paddleOneY = max(this.paddleOneY, 0);
    }
  }
  updatePaddleTwo(dir: string) {
    if (dir === 'DOWN') {
      this.paddleTwoY += this.paddleSpeed;
      this.paddleTwoY = min(this.paddleTwoY, this.height - this.paddleHeight);
    } else {
      this.paddleTwoY -= this.paddleSpeed;
      this.paddleTwoY = max(this.paddleTwoY, 0);
    }
  }
  handlePaddleOneBounce() {
    if (
      this.ballDirX === -1 &&
      this.ballY > this.paddleOneY &&
      this.ballY < this.paddleOneY + this.paddleHeight // ball in front of paddle and going toward paddle
    ) {
      // console.log("in paddle one range")
      this.ballX = max(this.ballX, this.ballRadius / 2 + this.paddleWidth);
      if (this.ballX - this.ballRadius / 2 - this.paddleWidth <= 0)
        this.ballDirX *= -1;
    } else if (
      //vertical intersection, ball going down
      this.ballDirX === -1 &&
      this.ballDirY === 1 &&
      this.ballX > 0 &&
      this.ballX < this.paddleOneX + this.paddleWidth && // ball in front of paddle and going toward paddle
      this.ballY < this.paddleOneY + this.paddleHeight / 2
    ) {
      this.ballY = min(this.ballY, this.paddleOneY - this.ballRadius / 2);
      if (this.ballY + this.ballRadius / 2 >= this.paddleOneY)
        this.ballDirY *= -1;
    } else if (
      //vertical intersection, ball going up
      this.ballDirX === -1 &&
      this.ballDirY === -1 &&
      this.ballX > 0 &&
      this.ballX < this.paddleOneX + this.paddleWidth &&
      this.ballY > this.paddleOneY + this.paddleHeight / 2
    ) {
      this.ballY = max(
        this.ballY,
        this.paddleOneY + this.paddleHeight + this.ballRadius / 2,
      );
      if (
        this.ballY - this.ballRadius / 2 <=
        this.paddleOneY + this.paddleHeight
      )
        this.ballDirY *= -1;
    }
  }
  handlePaddleTwoBounce() {
    if (
      //horizontal intersection
      this.ballDirX === 1 &&
      this.ballY > this.paddleTwoY &&
      this.ballY < this.paddleTwoY + this.paddleHeight // ball in front of paddle and going toward paddle
    ) {
      this.ballX = min(
        this.ballX,
        this.width - this.ballRadius / 2 - this.paddleWidth,
      );
      if (this.ballX + this.ballRadius / 2 + this.paddleWidth >= this.width)
        this.ballDirX *= -1;
    } else if (
      //vertical intersection, ball going down
      this.ballDirX === 1 &&
      this.ballDirY === 1 &&
      this.ballX > this.paddleTwoX &&
      this.ballX < this.paddleTwoX + this.paddleWidth && // ball in front of paddle and going toward paddle
      this.ballY < this.paddleTwoY + this.paddleHeight / 2
    ) {
      this.ballY = min(this.ballY, this.paddleTwoY - this.ballRadius / 2);
      if (this.ballY + this.ballRadius / 2 >= this.paddleTwoY)
        this.ballDirY *= -1;
    } else if (
      //vertical intersection, ball going up
      this.ballDirX === 1 &&
      this.ballDirY === -1 &&
      this.ballX > this.paddleTwoX &&
      this.ballX < this.paddleTwoX + this.paddleWidth &&
      this.ballY > this.paddleTwoY + this.paddleHeight / 2
    ) {
      this.ballY = max(
        this.ballY,
        this.paddleTwoY + this.paddleHeight + this.ballRadius / 2,
      );
      if (
        this.ballY - this.ballRadius / 2 <=
        this.paddleTwoY + this.paddleHeight
      )
        this.ballDirY *= -1;
    }
  }
  handleInput(payload: UserInput) {
    if (payload.userId === this.players[0]) this.updatePaddleOne(payload.input);
    else this.updatePaddleTwo(payload.input);
  }
}
