import { useState, useEffect } from "react";
import Loading from "/src/Components/Loading";
import ElementBar from "/src/Components/ElementBar";
import UserCard from "/src/Components/UserCard";
import GamePad from "/src/assets/icons/gamepad.svg";
import DmIcon from "/src/assets/icons/dm.svg";


const userExample = {
  username: 'AlaeZx07',
  id: 121878,
}




function FriendListItems() {
  return (
    <ElementBar >
      <div className="w-full flex justify-between items-center">
        <UserCard user={userExample} />
        <div className="flex items-center gap-4 sm:gap-8 sm:mr-8">
          <button className="" >
            <GamePad className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-lotion ease-in duration-150" />
          </button>
          <button className="" >
            <DmIcon className="w-6 h-4 sm:w-8 sm:h-6 fill-lotion/50 hover:fill-lotion ease-in duration-150" />
          </button>
        </div>
      </div>

    </ElementBar>
  );
}

export default function FriendList() {

  let [done, setDone] = useState(false);

  useEffect(() => {

    const TO = setTimeout(() => {
      setDone(true);
    }, 1000);

    return (() => (clearTimeout(TO)));
  }, []);

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {done ? <FriendListItems /> : <Loading />}
    </ul>
  );
}
