import Home from "./Home";
import Friends from "./Friends";
import Leaderboard from "./Leaderboard";
import Messages from "./Messages";
import Rooms from "./Rooms";
import Profile from "./Profile";
import Game from "./Game";
import { useRef } from "react";

function getPage(page, props) {
  switch (page) {
    case 'home':
      return <Home />;
    case 'leaderboard':
      return <Leaderboard  />;
    case 'friends':
      return <Friends  />;
    case 'messages':
      return <Messages  />;
    case 'rooms':
      return <Rooms  />;
    case 'profile':
      return <Profile  />;
    case 'game':
      return <Game props={props} />;
    default:
      return null;
  }
}

const Section = (props) => {
  const sectionRef = useRef(null);
  const Page = getPage(props.page, {parentRef:sectionRef});

  return (
    <section ref={sectionRef} className="border border-red Dash-main container">
      {Page}
    </section>
  );
};

export default Section;
