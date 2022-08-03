import UserCard from "components/Usercard";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";

import {Game } from "types/game"
import { User } from "types/user";
import { getUser } from "~/src/services/axios";

const Result = ({game}: {game:Game}) => {

  return (
    <div className="flex items-center gap-4 md:gap-8">
      <p className="text-pictonBlue text-sm md:text-xl font-bold">{game.scoreOne}</p>
      <p className="text-sm md:text-xl font-bold">VS</p>
      <p className="text-crayola text-sm md:text-xl font-bold">{game.scoreTwo}</p>
    </div>
  );
}

const GameResult = ({game}: {game:Game}) => {
  const { user } = useAuth();
  const userIdx = user.uid === game.playerOne ? 0 : 1
  const [opponent, setOpponent] = useState({} as User) 

  useEffect(()=>{
    getUser(userIdx ? game.playerOne : game.playerTwo).then((opponent: User)=>{
      setOpponent(opponent);
    })
  },[])
  return (
    <li className="group bg-queenBlue/50 flex justify-between items-center rounded-xl border border-transparent hover:border-pictonBlue mb-1 py-1 ease-linear duration-100">
      <div className="group-hover:bg-pictonBlue w-1 mr-[1px] h-[25px] md:h-[45px] rounded-3xl"></div>
      <div className="top-game flex gap-2 md:gap-8 justify-center items-center ">
        <UserCard user={!userIdx ? user : opponent} />
        <Result game={game}/>
        <UserCard user={userIdx ? user : opponent} />
      </div>
      <div className="group-hover:bg-pictonBlue w-1 ml-[1px] h-[25px] md:h-[45px] rounded-3xl"></div>
    </li>
  );
};

export default GameResult;
