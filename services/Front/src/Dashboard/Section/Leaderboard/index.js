import { MD } from "/src/Components/Constants";
import Logo from "/src/Components/Logo";
import Prize from "/src/assets/images/prize.png"
import useMedia from "/src/Hooks/useMedia";

export default function Leaderboard() {

  let md = useMedia(MD);

  return (
    <div className="overfllow-scroll flex flex-col gap-4">
      <header className="bg-queenBlue/50 rounded-2xl p-4 relative md:h-[200px]">
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="text-[70px] text-crayola">Pong</h1>
        </div>
        <h2 className="capitalize">Top players</h2>
        {md && <img alt="prize" src={Prize} className="h-[200px] absolute bottom-0 right-20" />}
      </header>
      <div className="bg-queenBlue/50 rounded-2xl p-4">

      </div>
    </div>
  );
}
