import { useEffect, useState } from "react";
import useAuth from "~/src/hooks/useAuth";
import { getPlayerHistory } from "~/src/services/game";
import GameResult from "../Gameresult";



function MatchHistory() {
  const {user} = useAuth();

  const [games, setGames] = useState([] as JSX.Element[])

  useEffect(()=> {
    getPlayerHistory(user.uid).then(
      (raw)=>{
        let g: JSX.Element[] = []
        for (let i = 0; i < raw.length; i++) {
          g.unshift(<GameResult game={raw[i]} key={i * 100} />);
        }
        setGames(g);
      }
    )
  },[])
  return (
    <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
      <h2 className="mb-2 capitalize text-xl md:text-3xl">match History</h2>
      <ul>{games}</ul>
    </div>
  );
}

export default MatchHistory;
