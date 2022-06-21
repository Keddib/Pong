import Home from "./Home";
import Friends from "./Friends";
import Leaderboard from "./Leaderboard";
import Messages from "./Messages";
import Rooms from "./Rooms";
import Profile from "./Profile";

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
    default:
      return null;
  }
}

const Section = (props) => {

  const Page = getPage(props.page);
  return (
    <section className="border border-red Dash-main container">
      {Page}
    </section>
  );
};

export default Section;
