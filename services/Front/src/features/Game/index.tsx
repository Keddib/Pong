import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Play from "./components/Playing";
import Waiting from "./components/Waiting";
import io from "socket.io-client";
import { User } from "types/user";

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

export default function Game() {
  const [player, setPlayer] = useState({} as User);
  const [gameState, setGameState] = useState("waiting");

  // const [gameStateData, setGameStateData] = useState({})
  const gameStateData = useRef(0);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("ws://localhost:3001", { withCredentials: true }).on(
      "connect",
      () => {
        //console.log("socket created", socket.current)
        socket.current.emit("playerJoined");
        socket.current.on("gameState", (data) => {
          if (gameState == "waiting") setGameState("play");
          gameStateData.current = data;
        });
      }
    );

    return () => socket.current.close();
  });

  const navigate = useNavigate();

  let page = <Waiting opponent={player} setGameState={setGameState} />;

  if (gameState == "play")
    page = (
      <Play
        players={[user1, user1]}
        gameStateData={gameStateData}
        socket={socket}
      />
    );
  else if (gameState == "canceled") {
    navigate("/home", { replace: true });
  }
  return <>{page}</>;
}
