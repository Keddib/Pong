import { Injectable } from '@nestjs/common';
import axios from 'axios';

export  class CreateGameDto {

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

  winner? : string;
}
@Injectable()
export class GameService {
  async newGame(cookie: string, data: CreateGameDto): Promise<CreateGameDto | false> {
    try {
      const res = await axios.post('http://localhost:3500/game', 
        data,
        { // http://users:3500 when docker compose
          headers: { cookie },
        },
      );
      console.log("game created > ",res.data)
      return res.data;
    } catch (e) {
      //console.log(e);
      return false;
    }
  }
  async updateGame(cookie: string, gameId:string , data: UpdateGameDto): Promise<CreateGameDto | false> {
    try {
      const res = await axios.post('http://localhost:3500/game/'+gameId, 
        data,
        { // http://users:3500 when docker compose
          headers: { cookie },
        },
      );
      console.log("game updated > ",res.data)
      return res.data;
    } catch (e) {
      //console.log(e);
      return false;
    }
  }
}
