import { SM } from "/src/Components/Constants";
import UserCard from '/src/Components/UserCard';
import UserStarXP from "./components/UserStarXP";
import Notifications from "./components/Notifications";
import useMedia from "/src/Hooks/useMedia";
import useAuth from "/src/Hooks/useAuth";

const userXP = {
  lvl: 12,
  ex: 1537,
};



export default function Headers() {

  let { user } = useAuth();
  let sm = useMedia(SM);

  return (
    <header className="DashHeader w-full">
      {
        sm ?
          <>
            <UserStarXP user={userXP} />
            <div className="lg:grow"></div>
            <div className="flex justify-between items-center w-full  lg:w-80">
              <UserCard user={user} />
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
