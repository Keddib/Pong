import GamePad from "assets/icons/gamepad.svg";
import Star from "assets/icons/star.svg";
import CircleX from "assets/icons/circle-xmark.svg";
import GameResult from "features/Profile/components/Gameresult";
import useAuth from "hooks/useAuth";

function OverView() {
  const {user} = useAuth();
  return (
    <>
      <div className="rounded-2xl bg-spaceCadet p-4 flex flex-col gap-2 sm:gap-4 md:gap-8">
        <div>
          <div className="flex justify-between items-center px-2">
            <p>Lvl. {user.level}</p>
            <p>{user.xp} / 100 xp</p>
          </div>
          <div className="bg-lotion/30 rounded-2xl h-4">
            
            <div className="rounded-2xl bg-crayola h-full" style={{width:(user.xp / 100 * 100).toString()+"%"}}></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-around">
          <div className="flex items-center gap-4">
            <div className="bg-queenBlue w-16 h-16 rounded-lg flex justify-center items-center shadow-md">
              <GamePad className="w-12 fill-lotion" />
            </div>
            <div>
              <span className="font-beaufort font-bold text-3xl">{user.wins + user.losses}</span>
              <p className="text-lotion/50">game played</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-queenBlue w-16 h-16 rounded-lg flex justify-center items-center shadow-md">
              <Star className="w-10 fill-lotion" />
            </div>
            <div>
              <span className="font-beaufort font-bold text-3xl">{user.wins}</span>
              <p className="text-lotion/50">game wins</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-queenBlue w-16 h-16 rounded-lg flex justify-center items-center shadow-md">
              <CircleX className="w-10 fill-lotion" />
            </div>
            <div>
              <span className="font-beaufort font-bold text-3xl">{user.losses}</span>
              <p className="text-lotion/50">game loses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
        <h2 className="capitalize mb-2 text-xl md:text-3xl">top game</h2>
        {/* <GameResult game=/> */}
      </div>
    </>
  );
}

export default OverView;
