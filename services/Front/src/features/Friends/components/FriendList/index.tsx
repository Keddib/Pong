import DmIcon from "assets/icons/dm.svg";
import GamePad from "assets/icons/gamepad.svg";
import { useState, useEffect } from "react";
import Loading from "components/Loading";
import ElementBar from "components/ElementBar";
import UserCard from "components/Usercard";

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

function FriendListItems() {
  return (
    <ElementBar className="" line="">
      <div className="w-full flex justify-between items-center">
        <UserCard user={user1} />
        <div className="flex items-center gap-4 sm:gap-8 sm:mr-8">
          <button className="">
            <GamePad className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-lotion ease-in duration-150" />
          </button>
          <button className="">
            <DmIcon className="w-6 h-4 sm:w-8 sm:h-6 fill-lotion/50 hover:fill-lotion ease-in duration-150" />
          </button>
        </div>
      </div>
    </ElementBar>
  );
}

export default function FriendList() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const TO = setTimeout(() => {
      setDone(true);
    }, 1000);

    return () => clearTimeout(TO);
  }, []);

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {done ? <FriendListItems /> : <Loading />}
    </ul>
  );
}
