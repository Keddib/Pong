import { Link } from "react-router-dom";
import Image from "components/Image";
import { User } from "~/src/types/user";
import { FunctionComponent } from "react";

type Props = {
  user: User;
};

const UserCard: FunctionComponent<Props> = ({ user }) => {
  let displayName: string = user.Nickname;
  if (user.Nickname.length > 18) {
    displayName = user.Nickname.substring(0, 17);
    displayName += ".";
  }

  return (
    <Link to={"/"} className="user-wrapper group">
      <div className="relative">
        <div className="rounded-full bg-queenBlue/50 w-10 h-10 sm:w-16 sm:h-16">
          <Image imageUrl={user.Avatar} alt="user" className="user-img" />
        </div>
        <span className={user.Status}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4 className="text-sm sm:text-lg">{displayName}</h4>
        <p className="hidden sm:block text-sm">{user.Username}</p>
      </div>
    </Link>
  );
};

export default UserCard;
