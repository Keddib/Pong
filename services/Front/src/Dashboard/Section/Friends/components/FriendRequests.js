import { useState, useEffect } from "react";
import Loading from "/src/Components/Loading";
import ElementBar from "/src/Components/ElementBar";
import UserCard from "/src/Components/UserCard";
import Xmark from "/src/assets/icons/xmark.svg";
import Check from "/src/assets/icons/check.svg";

const userExample = {
  username: 'AlaeZx07',
  id: 121878,
}




function FriendListItems() {
  return (
    <ElementBar >
      <div className="w-full flex justify-between items-center">
        <UserCard user={userExample} />
        <div className="flex items-center sm:gap-8 sm:mr-8">
          <button className="rounded-full hover:bg-red/10 p-[2px]" >
            <Xmark className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-red ease-in duration-150" />
          </button>
          <button className="rounded-full hover:bg-electricGreen/10 p-[2px]" >
            <Check className="w-6 h-6 sm:w-8 sm:h-8 fill-lotion/50 hover:fill-electricGreen ease-in duration-150" />
          </button>
        </div>
      </div>

    </ElementBar>
  );
}

export default function FriendRequests() {

  let [done, setDone] = useState(false);

  useEffect(() => {

    const TO = setTimeout(() => {
      setDone(true);
    }, 1000);

    return () => { clearTimeout(TO); };
  }, [])

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {done ? <FriendListItems /> : <Loading />}
    </ul>
  );
}
