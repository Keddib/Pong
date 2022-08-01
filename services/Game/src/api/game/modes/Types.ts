import { Server } from 'socket.io';

export interface UserInput {
    input: string;
    userId: string;
}

export class Game {
    server: Server;


    mode: string; // game mode
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

    done: boolean;
    timeout: number; // for no timeout // time player left game 
    timeoutPeriodInSeconds: number;

    winner: string | undefined;

    gameModeConfig: null | DoublePaddleConfig | GoalKeeperConfig
}

export class DoublePaddleConfig {
    paddleYOffset = 0.3; // % of height // height * paddleYOffset + paddleHeight should be less than height so paddle can move
    paddleXOffset =  0.3; // % of width
}

export class GoalKeeperConfig {
    borderSize = 0.1; // % of height
    goalSize = 0.3;
}
export interface GameState {
    mode: string; //gamemode

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
    maxScore: number;
    players: Array<string>;
    timestamp: number;

    done: boolean;

    winner: string;

    timeout: number; // 0 for no timeout // time player left game 
    timeoutPeriodInSeconds: number;

    gameModeConfig: null | DoublePaddleConfig | GoalKeeperConfig
}