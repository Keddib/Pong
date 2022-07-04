import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Play from "./components/Play";
import Waiting from "./components/Waiting";
import UserImg from "/src/assets/images/user.jpg";


var user1 = {
  id: "123",
  img: UserImg,
  name: "AlaeOX7",
  status: "Online",
  dot: "green-dot"
};

export default function Game() {

  let [player, setPlayer] = useState(false);
  let [gameState, setGameState] = useState('waiting');
  let navigate = useNavigate();

  setTimeout(() => { setPlayer(user1); setTimeout(() => setGameState('play'), 1000) }, 1000);

  let page = <Waiting opponent={player} setGameState={setGameState} />

  if (gameState == 'play')
    page = <Play players={[user1, user1]} setGameState={setGameState} />
  else if (gameState == 'canceled') {
    navigate('/home', { replace: true });
  }
  return (
    <>
      {page}
    </>
  );

}
