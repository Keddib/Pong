import HomeIcon from "../../../public/assets/icons/house.svg";
import BoardIcon from "../../../public/assets/icons/chart-simple.svg";
import ChatIcon from "../../../public/assets/icons/comment-dots.svg";
import FriendsIcon from "../../../public/assets/icons/user-group.svg";
import GroupIcon from "../../../public/assets/icons/users.svg";
import ProfileIcon from "../../../public/assets/icons/user.svg";
import Logo from "../../Components/Logo";

import IconWrap from "./components/Icon";

export default function NavBar() {
  return (
    <div className="navbar gradientSpaceCadet shadow-sm rounded-r-2xl">
      <div className=" h-full py-10 flex flex-col">
        <div className="mb-16 cursor-pointer flex justify-center ">
          <Logo className="group-hover:animate-bounce" />
        </div>
        <IconWrap icon={<HomeIcon className="w-8 homeIcon " />} />
        <IconWrap icon={<BoardIcon className="w-[30px] homeIcon " />} />
        <IconWrap icon={<ChatIcon className="w-8 homeIcon " />} />
        <IconWrap icon={<FriendsIcon className="w-8 homeIcon " />} />
        <IconWrap icon={<GroupIcon className="w-[35px] homeIcon " />} />
        <div className="grow"></div>
        <IconWrap
          className="mb-auto"
          icon={<ProfileIcon className="w-[28px] homeIcon " />}
        />
      </div>
    </div>
  );
}
