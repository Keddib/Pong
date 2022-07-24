import Star from "assets/icons/star.svg";
import { User } from "types/user";
import { FunctionComponent } from "react";

const UserStarXP: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <div className="EX">
      <Star className="fill-crayola w-14 mr-4" />
      <p className=" font-beaufort font-semibold text-xl absolute top-[17px] left-[15px]">
        {user.Level}
      </p>
      <div className="flex flex-col justify-center grow ">
        <p>{`${user.XP}xp`}</p>
        <div className="w-full h-3 rounded-3xl bg-lotion/50">
          <div className="w-2/3 bg-crayola h-3 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default UserStarXP;
