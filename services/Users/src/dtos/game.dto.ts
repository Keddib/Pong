

export  class CreateGameDto {
    id: number;

    gameId: string;

    mode: "classic" | "doublepaddle" | "goalkeeper";

    playerOne : string;

    playerTwo : string;

    scoreOne : number;

    scoreTwo : number;
    
    status : 0 | 1;
}

export  class UpdateGameDto {
    scoreOne? : number;

    scoreTwo? : number;
    
    status? : 0 | 1;

    winner? :string;
}