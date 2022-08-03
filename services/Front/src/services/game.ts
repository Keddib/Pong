import axios from "axios";
import { api } from "config/index";

const axiosGame = axios.create({
  baseURL: api.users,
});

import { Game } from "types/game";

async function getPlayerHistory(userId : string): Promise<Game[]> {
  // send response to update user
  const res = await axiosGame.get<Game[]>("/game/history/"+userId, {
    withCredentials: true,
  });
  var games: Game[] = res.data;
  return games;
}

async function getPlayerCurrentGame(userId : string): Promise<Game[]> {
    // send response to update user
    const res = await axiosGame.get<Game[]>("/game/current/"+userId, {
      withCredentials: true,
    });
    var games: Game[] = res.data;
    return games;
  }

export { getPlayerCurrentGame, getPlayerHistory };
