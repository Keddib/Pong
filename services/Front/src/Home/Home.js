import HomeGif from "../../public/assets/images/Home.gif"
import Logo from "../Components/Logo";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
// import Character from "../../public/assets/images/HomeCharacter.png"

export default function Home() {

  return (
    <div
      className="w-full h-full homeBackGround overflow-hidden"
      style={{ backgroundImage: `url(${HomeGif})` }}
    >
      <div className="h-full w-full bg-spaceCadet/50">
        <div className="container h-full">
          <header className="py-4 px-4 md:px-10 flex items-center" >
            <Logo />
            <div className="grow"></div>
            <div className="w-[120px]">
              <Link to="/signin">
                <Button text="sign in" className=" bg-pictonBlue text-lotion hover:bg-lotion hover:text-spaceCadet" />
              </Link>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}
