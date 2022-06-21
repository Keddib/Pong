import { useState } from "react";
import Loading from "/src/Components/Loading";
import UserBar from "/src/Components/UserBar";
import User from "/src/assets/images/user.jpg";

var friendList = [];

for (let i = 0; i < 10; i++) {
  friendList[i] =
  {
    id: Math.floor(Math.random() * 100) + 1,
    name: 'Alaex07',
    status: 'online',
    statusColor: 'online-dot',
    img: User
  }
}

export default function FriendList() {

  let [done, setDone] = useState(false);

  setTimeout(() => {
    setDone(true);
  }, 1000);

  return (
    <ul className="flex flex-col gap-1 h-full overflow-auto no-scrollbar">
      {
        !done ? <Loading /> : friendList.map((friend) => {
          return (
            <UserBar key={friend.id} user={friend} />
          );
        })
      }
    </ul>
  );
}
