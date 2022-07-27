import { mediaQueries } from "config/index";
import UserCard from "components/Usercard";
import UserStarXP from "./components/StarXP";
import Notifications from "./components/Notification";
import useMedia from "hooks/useMedia";
import useAuth from "hooks/useAuth";

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

export default function Headers() {
  const { user } = useAuth();
  const sm = useMedia(mediaQueries.sm);

  return (
    <header className="DashHeader w-full">
      {sm ? (
        <>
          <UserStarXP user={user1} />
          <div className="lg:grow"></div>
          <div className="flex justify-between items-center w-full  lg:w-80">
            <UserCard user={user} />
            <Notifications />
          </div>
        </>
      ) : (
        <>
          <h4>notifications</h4>
          <Notifications />
        </>
      )}
    </header>
  );
}
