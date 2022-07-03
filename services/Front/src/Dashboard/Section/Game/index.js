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
  let [game, setGame] = useState('waiting');
  let navigate = useNavigate();

  setTimeout(() => { setPlayer(user1); setTimeout(() => setGame('play'), 1000) }, 200000000);

  let page = <Waiting opponent={player} setGame={setGame} />

  if (game == 'play')
    page = <Play players={[user1, user1]} />
  else if (game == 'canceled') {
    navigate('/home/', { replace: true });
  }
  return (
    <>
      {page}
    </>
  );

}
