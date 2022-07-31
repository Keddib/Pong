interface GameWindowProps {
    gameStateData: any;
    socket: any;
    width: number;
    height: number;
  }
  
interface DoublePaddleConfig {
    paddleYOffset: number; // 30% of height
    paddleXOffset: number; // 30% of width
    
}
interface GoalKeeperConfig {
    paddleYOffset: number; // 30% of height
    paddleXOffset: number; // 30% of width
}
interface GameState {
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
export { GameState, GameWindowProps}