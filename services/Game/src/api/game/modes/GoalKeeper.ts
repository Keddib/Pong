import { Server } from 'socket.io';
import {Game, UserInput, GoalKeeperConfig, GameState} from "./Types"

const min = (a: number, b: number) => {
  return a < b ? a : b;
};
const max = (a: number, b: number) => {
  return a > b ? a : b;
};

export class GoalKeeper extends Game {
  constructor(server: Server) {
    super();
    this.mode = "GoalKeeper",

    this.server = server;

    this.aspectRatio = 16 / 9;
    this.width = 1000;
    this.height = this.width / this.aspectRatio;

    this.gameModeConfig = new GoalKeeperConfig()

    this.initBallX = this.width / 2;
    this.initBallY = this.height / 2;
    this.ballRadius = 25;
    this.ballSpeed = 5;
    this.ballX = this.initBallX;
    this.ballY = this.initBallY;
    this.ballDirX = -1;
    this.ballDirY = -1;

    this.paddleWidth = 30;
    this.paddleHeight = 150;
    this.paddleSpeed = 5;
    this.paddleOneX = this.height * this.gameModeConfig.borderSize;
    this.paddleOneY = this.height * this.gameModeConfig.borderSize;
    this.paddleTwoX = this.width - this.paddleWidth - this.height * this.gameModeConfig.borderSize;
    this.paddleTwoY = this.height * this.gameModeConfig.borderSize;

    this.state = 0;

    this.players = [];
    this.scores = [0, 0];
    this.maxScore = 3;
    this.room = '';

    this.done = false;
    this.timeout = 0;
    this.timeoutPeriodInSeconds = 5; 

    this.winner = "";

    this.playerData = []


    //this.run();
  }
  init() {
    this.ballX = this.initBallX;
    this.ballY = this.initBallY;

    const totalGoals = this.scores[0] + this.scores[1];
    this.ballDirX = totalGoals % 2 ? 1 : -1;
    this.ballDirY = -1;

    const borderSize = this.height * (<GoalKeeperConfig>this.gameModeConfig).borderSize

    this.paddleOneX = borderSize;
    this.paddleOneY = borderSize;

    this.paddleTwoX = this.width - this.paddleWidth - borderSize;
    this.paddleTwoY = borderSize;
  }
  cleanup(): void {
    this.emitState();
    clearInterval(this.loop);
  }
  setDone(d: boolean){
    this.done = d;
  }
  setTimeout(v: number){
    this.timeout = v;
  }
  getPlayers(): Array<string> {
    return this.players;
  }
  addPlayer(id: string, user: any): void {
    if (this.players.length < 2){
      this.players.push(id);
      this.playerData.push(user);
    }
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
      mode: "GoalKeeper",
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

      timeout: this.timeout,
      timeoutPeriodInSeconds: this.timeoutPeriodInSeconds,

      gameModeConfig: this.gameModeConfig,
      playerData: JSON.stringify(this.playerData),
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
      if(this.done)
        this.cleanup()

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
  intersectionBorder({rx,ry}){
    const borderSize = this.height * (<GoalKeeperConfig>this.gameModeConfig).borderSize
    const DeltaX = this.ballX - max(rx, min(this.ballX, rx + borderSize));
    const borderHeight = this.height * (0.5 - (<GoalKeeperConfig>this.gameModeConfig).goalSize / 2)
    const DeltaY = this.ballY - max(ry, min(this.ballY, ry + borderHeight));
    return (DeltaX * DeltaX + DeltaY * DeltaY) < (this.ballRadius * this.ballRadius);
  }
  updateBall() {
    //update
    this.ballX += this.ballSpeed * this.ballDirX;
    this.ballY += this.ballSpeed * this.ballDirY;

    //no overlap ?
    if (this.ballDirX > 0)
      this.ballX = min(this.ballX, this.width - this.ballRadius);
    else this.ballX = max(this.ballX, this.ballRadius);
    if (this.ballDirY > 0)
      this.ballY = min(this.ballY, this.height - this.ballRadius);
    else this.ballY = max(this.ballY, this.ballRadius);

    const borderSize = this.height * (<GoalKeeperConfig>this.gameModeConfig).borderSize
    const borderHeight = this.height * (0.5 - (<GoalKeeperConfig>this.gameModeConfig).goalSize / 2)

    let rx = 0 
    let ry = 0
    if(this.intersectionBorder({ // top left
      rx,
      ry
    })){
      
      const DeltaX = max(rx, min(this.ballX, rx + borderSize));
      const DeltaY = max(ry, min(this.ballY, ry + borderHeight));
      if (DeltaX > rx && DeltaX < rx + borderSize){
        if(DeltaY === ry){
          this.ballY = min(this.ballY, ry-this.ballRadius);
          this.ballDirY *= -1;
        }
        else if(DeltaY === ry + borderHeight)  {
          this.ballY = max(this.ballY, ry + borderHeight + this.ballRadius);
          this.ballDirY *= -1;
        }
      }
      if (DeltaY > ry && DeltaY < ry + borderHeight){
        if(DeltaX === rx){
          this.ballX = min(this.ballX, rx-this.ballRadius);
          this.ballDirX *= -1;
        }
        else if(DeltaX === rx+borderSize){
          this.ballX = max(this.ballX, rx + borderSize + this.ballRadius);
          this.ballDirX *= -1;
        }
      }
    }
    rx = 0
    ry = this.height - borderHeight
    if(this.intersectionBorder({ // bot left
      rx,
      ry
    })){
      
      const DeltaX = max(rx, min(this.ballX, rx + borderSize));
      const DeltaY = max(ry, min(this.ballY, ry + borderHeight));
      if (DeltaX > rx && DeltaX < rx + borderSize){
        if(DeltaY === ry){
          this.ballY = min(this.ballY, ry-this.ballRadius);
          this.ballDirY *= -1;
        }
        else if(DeltaY === ry + borderHeight)  {
          this.ballY = max(this.ballY, ry + borderHeight + this.ballRadius);
          this.ballDirY *= -1;
        }
      }
      if (DeltaY > ry && DeltaY < ry + borderHeight){
        if(DeltaX === rx){
          this.ballX = min(this.ballX, rx-this.ballRadius);
          this.ballDirX *= -1;
        }
        else if(DeltaX === rx+borderSize){
          this.ballX = max(this.ballX, rx + borderSize + this.ballRadius);
          this.ballDirX *= -1;
        }
      }
    }
    rx = this.width - borderSize // top right
    ry = 0
    if(this.intersectionBorder({ // bot left
      rx,
      ry
    })){
      
      const DeltaX = max(rx, min(this.ballX, rx + borderSize));
      const DeltaY = max(ry, min(this.ballY, ry + borderHeight));
      if (DeltaX > rx && DeltaX < rx + borderSize){
        if(DeltaY === ry){
          this.ballY = min(this.ballY, ry-this.ballRadius);
          this.ballDirY *= -1;
        }
        else if(DeltaY === ry + borderHeight)  {
          this.ballY = max(this.ballY, ry + borderHeight + this.ballRadius);
          this.ballDirY *= -1;
        }
      }
      if (DeltaY > ry && DeltaY < ry + borderHeight){
        if(DeltaX === rx){
          this.ballX = min(this.ballX, rx-this.ballRadius);
          this.ballDirX *= -1;
        }
        else if(DeltaX === rx+borderSize){
          this.ballX = max(this.ballX, rx + borderSize + this.ballRadius);
          this.ballDirX *= -1;
        }
      }
    }
    rx = this.width - borderSize // top right
    ry = this.height - borderHeight
    if(this.intersectionBorder({ // bot left
      rx,
      ry
    })){
      
      const DeltaX = max(rx, min(this.ballX, rx + borderSize));
      const DeltaY = max(ry, min(this.ballY, ry + borderHeight));
      if (DeltaX > rx && DeltaX < rx + borderSize){
        if(DeltaY === ry){
          this.ballY = min(this.ballY, ry-this.ballRadius);
          this.ballDirY *= -1;
        }
        else if(DeltaY === ry + borderHeight)  {
          this.ballY = max(this.ballY, ry + borderHeight + this.ballRadius);
          this.ballDirY *= -1;
        }
      }
      if (DeltaY > ry && DeltaY < ry + borderHeight){
        if(DeltaX === rx){
          this.ballX = min(this.ballX, rx-this.ballRadius);
          this.ballDirX *= -1;
        }
        else if(DeltaX === rx+borderSize){
          this.ballX = max(this.ballX, rx + borderSize + this.ballRadius);
          this.ballDirX *= -1;
        }
      }
    }
    //collision
    if (
      this.ballX + this.ballRadius >= this.width ||
      this.ballX - this.ballRadius <= 0
    ) {
      this.ballDirX *= -1;

      if (this.ballX + this.ballRadius >= this.width) this.scores[0] += 1; // +1 playerOne
      if (this.ballX - this.ballRadius <= 0) this.scores[1] += 1; // +1 playerTwo
      if (!this.gameOver()) {
        this.state = 3; // waiting for player to start the game
        this.init();
      } else this.state = 4; // final outcome

      //this.cleanup(); // pause loop
    }
    if (
      this.ballY + this.ballRadius >= this.height - borderSize ||
      this.ballY - this.ballRadius <= borderSize
    )
      this.ballDirY *= -1;
  }
  updatePaddleOne(dir: string) {
    const borderSize = this.height * (<GoalKeeperConfig>this.gameModeConfig).borderSize
    if (dir === 'DOWN') {
      this.paddleOneY += this.paddleSpeed;
      this.paddleOneY = min(this.paddleOneY, this.height - this.paddleHeight - borderSize);
    } else {
      this.paddleOneY -= this.paddleSpeed;
      this.paddleOneY = max(this.paddleOneY, borderSize);
    }
  }
  updatePaddleTwo(dir: string) {
    const borderSize = this.height * (<GoalKeeperConfig>this.gameModeConfig).borderSize

    if (dir === 'DOWN') {
      this.paddleTwoY += this.paddleSpeed;
      this.paddleTwoY = min(this.paddleTwoY, this.height - this.paddleHeight - borderSize);
    } else {
      this.paddleTwoY -= this.paddleSpeed;
      this.paddleTwoY = max(this.paddleTwoY, borderSize);
    }
  }
  intersectionPaddle({rx,ry}){
    const DeltaX = this.ballX - max(rx, min(this.ballX, rx + this.paddleWidth));
    const DeltaY = this.ballY - max(ry, min(this.ballY, ry + this.paddleHeight));
    return (DeltaX * DeltaX + DeltaY * DeltaY) < (this.ballRadius * this.ballRadius);
  }
  handlePaddleOneBounce() {
    let rx = this.paddleOneX
    let ry = this.paddleOneY
    if(this.intersectionPaddle({
      rx,
      ry
    })){
      
      const DeltaX = max(rx, min(this.ballX, rx + this.paddleWidth));
      const DeltaY = max(ry, min(this.ballY, ry + this.paddleHeight));
      if (DeltaX > rx && DeltaX < rx + this.paddleWidth){
        if(DeltaY === ry){
          this.ballY = min(this.ballY, ry-this.ballRadius);
          this.ballDirY *= -1;
        }
        else if(DeltaY === ry + this.paddleHeight)  {
          this.ballY = max(this.ballY, ry + this.paddleHeight + this.ballRadius);
          this.ballDirY *= -1;
        }
      }
      if (DeltaY > ry && DeltaY < ry + this.paddleHeight){
        if(DeltaX === rx){
          this.ballX = min(this.ballX, rx-this.ballRadius);
          this.ballDirX *= -1;
        }
        else if(DeltaX === rx+this.paddleWidth){
          this.ballX = max(this.ballX, rx + this.paddleWidth + this.ballRadius);
          this.ballDirX *= -1;
        }
      }
      
    }

  }
  handlePaddleTwoBounce() {
    let rx = this.paddleTwoX
    let ry = this.paddleTwoY
    if(this.intersectionPaddle({
      rx,
      ry
    })){
      
      const DeltaX = max(rx, min(this.ballX, rx + this.paddleWidth));
      const DeltaY = max(ry, min(this.ballY, ry + this.paddleHeight));
      if (DeltaY > ry && DeltaY < ry + this.paddleHeight){
        if(DeltaX === rx){
          this.ballX = min(this.ballX, rx-this.ballRadius);
          this.ballDirX *= -1;
        }
        else{
          this.ballX = max(this.ballX, rx + this.paddleWidth + this.ballRadius);
          this.ballDirX *= -1;
        }
      }
      else if (DeltaX > rx && DeltaX < rx + this.paddleWidth){
        if(DeltaY === ry){
          this.ballY = min(this.ballY, ry-this.ballRadius);
          this.ballDirY *= -1;
        }
        else{
          this.ballY = max(this.ballY, ry + this.paddleHeight + this.ballRadius);
          this.ballDirY *= -1;
        }
      }
    }
  }
  handleInput(payload: UserInput) {
    if (payload.userId === this.players[0]) this.updatePaddleOne(payload.input);
    else this.updatePaddleTwo(payload.input);
  }
}
