import { useState, useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";
import Play from "./components/Play";
import Waiting from "./components/Waiting";
import UserImg from "/src/assets/images/user.jpg";
import { io, Socket } from "socket.io-client";

var user1 = {
  id: "123",
  img: UserImg,
  name: "AlaeOX7",
  status: "Online",
  dot: "green-dot"
};
// interface GameState {
//   // Game variables
//   ballX: number;
//   ballY: number;
//   ballDirX: number;
//   ballDirY: number;

//   paddleOneX: number;
//   paddleOneY: number;

//   paddleTwoX: number;
//   paddleTwoY: number;

//   state: 0 | 1 | 2; // 0 waiting for player to join // 1 playing // 2 opponent left
//   players: Array<string>;
// }
export default function Game() {

  const [player, setPlayer] = useState(false);
  const [gameState, setGameState] = useState('waiting');
  
  // const [gameStateData, setGameStateData] = useState({})
  const gameStateData = useRef(0)
  const socket = useRef(null)

  useEffect(()=>{
    socket.current = io("http://localhost:3001").on('connect',()=>{
      console.log("socket created", socket.current)
      socket.current.emit('playerJoined');
      socket.current.on("gameState",(data)=>{
        if (gameState == 'waiting') setGameState('play')
        gameStateData.current=data;
      })
    })

    return ()=>socket.current.close();
  }, []);
  
  let navigate = useNavigate();

  //setTimeout(() => { setPlayer(user1); setTimeout(() => setGameState('play'), 1000) }, 1000);

  let page = <Waiting opponent={player} setGameState={setGameState} />

  if (gameState == 'play')
    page = <Play players={[user1, user1]} gameStateData={gameStateData} socket={socket}/>
  else if (gameState == 'canceled') {
    navigate('/home', { replace: true });
  }
  return (
    <>
      {page}
    </>
  );

}
