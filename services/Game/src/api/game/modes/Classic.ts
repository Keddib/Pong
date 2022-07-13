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

  state: 0 | 1 | 2;
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

    this.state = 0;

    this.players = [];
    this.room = '';
    //this.run();
  }

  cleanup(): void {
    this.emitState();
    clearInterval(this.loop);
  }

  getPlayers(): Array<string> {
    return this.players;
  }
  addPlayer(id: string): void {
    if (this.players.length < 2) this.players.push(id);
    if (this.players.length === 2) {
      this.run();
      this.toggleGameState();
    }
  }
  setRoomName(name: string): void {
    this.room = name;
  }
  toggleGameState(): void {
    this.state = this.state === 0 ? 1 : 2;
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
      players: this.players,
    };
  }
  async emitState() {
    this.server.to(this.room).emit('gameState', this.getGameState());
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
    else this.ballX = max(this.ballX, this.ballRadius / 2);
    if (this.ballDirY > 0)
      this.ballY = min(this.ballY, this.height - this.ballRadius / 2);
    else this.ballY = max(this.ballY, this.ballRadius / 2);

    //collision
    if (
      this.ballX + this.ballRadius / 2 >= this.width ||
      this.ballX - this.ballRadius / 2 <= 0
    )
      this.ballDirX *= -1;
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
    }
  }
  handlePaddleTwoBounce() {
    if (
      this.ballDirX === 1 &&
      this.ballY > this.paddleTwoY &&
      this.ballY < this.paddleTwoY + this.paddleHeight // ball in front of paddle and going toward paddle
    ) {
      // console.log("in paddle two range")

      this.ballX = min(
        this.ballX,
        this.width - this.ballRadius / 2 - this.paddleWidth,
      );

      if (this.ballX + this.ballRadius / 2 + this.paddleWidth >= this.width)
        this.ballDirX *= -1;
    }
  }
  handleInput(payload: UserInput) {
    if (payload.userId === this.players[0]) this.updatePaddleOne(payload.input);
    else this.updatePaddleTwo(payload.input);
  }
}
