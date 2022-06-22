import { SM } from "/src/Components/Constants";
import UserImg from "/src/assets/images/user.jpg";
import UserCard from '/src/Components/UserCard';
import UserStarXP from "./components/UserStarXP";
import Notifications from "./components/Notifications";
import useMedia from "/src/Hooks/useMedia";

const userXP = {
  lvl: 12,
  ex: 1537,
};

var user1 = {
  id: "123",
  img: UserImg,
  name: "AlaeOX7",
  status: "Online",
  dot: "green-dot"
};


export default function Headers() {

  let sm = useMedia(SM);

  return (
    <header className="DashHeader w-full">
      {
        sm ?
          <>
            <UserStarXP user={userXP} />
            <div className="md:grow"></div>
            <div className="flex justify-between items-center w-full md:w-60 lg:w-80">
              <UserCard user={user1} />
              <Notifications />
            </div>
          </>
          :
          <>
            <h4>notifications</h4>
            <Notifications />
          </>
      }
    </header>
  );
}
