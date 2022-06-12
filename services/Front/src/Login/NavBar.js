import logo from '../../public/assets/images/LOGO2.png';
import IconWrapper from "./Icon";
// import HomeIcon from "@assets/icons/house.svg";

export default function NavBar() {
  return (
    <div className="navbar bg-spaceCadet/100 h-full w-[88px] shadow-sm rounded-r-2xl">
      <div className="px-[12px] border border-red flex flex-wrap justify-center items-center pt-10">
        <img className="w-[46px] h-[46px]" src={logo} alt="pong logo" />
        <IconWrapper />
      </div>
    </div>
  );
}
