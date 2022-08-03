export interface Game {
    gameId: string;
  
    mode: string;
  
    playerOne : string;
  
    playerTwo : string;
  
    scoreOne : number;
  
    scoreTwo : number;
    
    status : 0 | 1;

    winner: string | null
}