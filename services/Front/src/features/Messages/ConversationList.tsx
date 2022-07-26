import { Link } from "react-router-dom";
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

const ConversationLink = () => {
  return (
    <Link to="12893">
      <ElementBar className="" line="">
        <div className="flex justify-between items-center w-full">
          <UserCard user={user1} />
          <span className="bg-pictonBlue w-4 h-4 sm:w-6 sm:h-6 rounded-full flex justify-center items-center">
            1
          </span>
        </div>
      </ElementBar>
    </Link>
  );
};

export default function ConversationList() {
  return (
    <ul className="flex flex-col gap-1">
      <li>
        <ConversationLink />
      </li>
      <li>
        <ConversationLink />
      </li>
    </ul>
  );
}
