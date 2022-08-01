import { Link } from "react-router-dom";
import Image from "components/Image";
import { User } from "types/user";
import { FunctionComponent } from "react";

const UserCard: FunctionComponent<{ user: User }> = ({ user }) => {
  var displayName = user.login;

  if (displayName?.length > 18) {
    displayName = displayName.substring(0, 17);
    displayName += ".";
  }

  return (
    <Link to={"/"} className="user-wrapper group">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 sm:w-16 sm:h-16">
          <Image imageUrl={user.avatar} alt="user" className="user-img" />
        </div>
        <span className={user.status}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm sm:text-lg">{user.login}</h4>
        <p className="hidden sm:block text-sm">{user.login}</p>
      </div>
    </Link>
  );
};

export default UserCard;
