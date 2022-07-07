import { Link } from "react-router-dom";
import ElementBar from "/src/Components/ElementBar";
import UserCard from "/src/Components/UserCard";

var user1 = {
  id: "123",
  username: "AlaeOX7",
  status: "offline",
  dot: "green-dot",
  image_url: 'http://localhost:3500/upload/402e5238f17f06fc7b8d08617758bb8c.jpg'
};

const Conversation = () => {
  return (
    <Link to="12893" >
      <ElementBar>
        <div className="flex justify-between items-center w-full">
          <UserCard user={user1} />
          <span className="bg-pictonBlue w-4 h-4 sm:w-6 sm:h-6 rounded-full flex justify-center items-center">1</span>
        </div>
      </ElementBar>
    </Link>
  );
}


export default function ConversationList() {
  return (
    <ul className="flex flex-col gap-1">
      <li>
        <Conversation />
      </li>
      <li>
        <Conversation />
      </li>
    </ul>
  );
}
