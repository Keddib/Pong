import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Play from "./components/Playing";
import Waiting from "./components/Waiting";
import io from "socket.io-client";
import { User } from "types/user";
import { Socket } from "socket.io-client";
import useAuth from "~/src/hooks/useAuth";

type IStatus = "online" | "offline" | "playing" | "spectating";

var user1 = {
  id: 12134,
  Username: "AlaeOX7",
  Nickname: "AlaeOX7",
  Status: "online" as IStatus,
  Avatar: "http://localhost:3500/upload/402e5238f17f06fc7b8d08617758bb8c.jpg",
  Wins: 100,
  Losses: 60,
  XP: 439,
  Level: 11,
};
interface LocationState {
  mode : string
}
interface Loc extends Location {
  state: LocationState
}
export default function Game() {
  const location : Loc = useLocation()
  console.log("game mode = ",location.state.mode)
  const {user} =  useAuth()
  const [opponent, setOpponent] = useState(null as null|User);
  
  const [gameState, setGameState] = useState("waiting");

  // const [gameStateData, setGameStateData] = useState({})
  const gameStateData = useRef(0);
  const socket: React.MutableRefObject<null | Socket> = useRef(null);
  let once = false;
  useEffect(() => {
    socket.current = io("ws://localhost:3001", { withCredentials: true }).on(
      "connect",
      () => {
        console.log("socket created", socket.current);
        socket.current?.on("authenticated", () => {
          socket.current?.emit("playerJoined", {mode : location.state.mode});
        });
        socket.current?.on("gameState", (data) => {

          if (gameState == "waiting" 
          && location.state.mode.toLowerCase() === data.mode.toLowerCase() 
          && !opponent && !once)
          {
            //console.log(data)
            setOpponent(JSON.parse(data.playerData)[(data.players.indexOf(socket.current.id) + 1) % 2])
            once=true;
            setTimeout(()=>{

              setGameState("play");
            },2500)
          }
          gameStateData.current = data;
        });
      }
    );

    return () => socket.current?.close();
  }, []);

  const navigate = useNavigate();

  let page = <Waiting user={user} opponent={opponent} setGameState={setGameState} />;

  if (gameState == "play")
    page = (
      <Play
        players={[user, (opponent as User)]}
        gameStateData={gameStateData}
        socket={socket}
      />
    );
  else if (gameState == "canceled") {
    navigate("/home", { replace: true });
  }
  return <>{page}</>;
}
