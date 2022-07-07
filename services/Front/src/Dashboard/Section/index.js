import { useOutletContext } from "react-router-dom";
import Home from "./Home";
import Friends from "./Friends";
import Leaderboard from "./Leaderboard";
import Messages from "./Messages";
import Rooms from "./Rooms";
import Profile from "./Profile";
import Game from "./Game";
import Error404 from "/src/Components/404";
import { XL } from "/src/Components/Constants";
import useMedia from "/src/Hooks/useMedia";
import { useEffect } from "react";



function getPage(page) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'leaderboard':
      return <Leaderboard />;
    case 'friends':
      return <Friends />;
    case 'messages':
      return <Messages />;
    case 'rooms':
      return <Rooms />;
    case 'profile':
      return <Profile />;
    case 'game':
      return <Game />;
    default:
      return null;
  }
}

const Section = (props) => {

  let xl = useMedia(XL);
  let [setChatBar] = useOutletContext();
  const Page = getPage(props.page);
  const messagesSide = Page.type.name == 'Messages' ? false : xl;

  useEffect(() => {
    setChatBar(messagesSide);
  }, [setChatBar, messagesSide]);

  return (
    <section className={`Dash-main container ${messagesSide ? 'main-grid-xl' : ''}`}>
      <div className="dash-home-layout">
        {Page ? Page : <Error404 />}
      </div>
    </section>
  );
};

export default Section;
