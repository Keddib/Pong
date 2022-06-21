import Xmark from "/src/assets/icons/xmark.svg";
import HomeIcon from "/src/assets/icons/house.svg";
import BoardIcon from "/src/assets/icons/chart-simple.svg";
import ChatIcon from "/src/assets/icons/comment-dots.svg";
import FriendsIcon from "/src/assets/icons/user-group.svg";
import GroupIcon from "/src/assets/icons/users.svg";
import ProfileIcon from "/src/assets/icons/user-astronaut.svg";
import IconLink from "/src/Components/Iconlink";
import Logout from "/src/assets/icons/logout.svg";


const Navbar = (props) => {

  return (
    <nav className="show-nav">
      <IconLink page="/app/" showNav={props.showNav}>
        <HomeIcon className="nav-icon" />
      </IconLink>
      <IconLink page="/app/leaderboard" showNav={props.showNav}>
        <BoardIcon className="nav-icon" />
      </IconLink>
      <IconLink page="/app/messages" showNav={props.showNav}>
        <ChatIcon className="nav-icon" />
      </IconLink>
      <IconLink page="/app/friends/" showNav={props.showNav}>
        <FriendsIcon className="nav-icon" />
      </IconLink>
      <IconLink page="/app/rooms" showNav={props.showNav}>
        <GroupIcon className="nav-icon" />
      </IconLink>
      <IconLink page="/app/profile" showNav={props.showNav}>
        <ProfileIcon className="nav-icon" />
      </IconLink>
      <div className="sm:grow"> </div>
      <button className="group mt-4">
        <Logout className="nav-icon  group-hover:fill-red/80 " />
      </button>
      <button onClick={props.showNav} className="group nav-btn">
        <Xmark className="nav-icon" />
      </button>
    </nav>
  );
};


export default Navbar;
