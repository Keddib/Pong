import GamePad from "assets/icons/gamepad.svg";
import Star from "assets/icons/star.svg";
import CircleX from "assets/icons/circle-xmark.svg";
import GameResult from "features/Profile/components/Gameresult";

function OverView() {
  return (
    <>
      <div className="rounded-2xl bg-spaceCadet p-4 flex flex-col gap-2 sm:gap-4 md:gap-8">
        <div>
          <div className="flex justify-between items-center px-2">
            <p>Lvl. 12</p>
            <p>75 / 111 xp</p>
          </div>
          <div className="bg-lotion/30 rounded-2xl h-4">
            <div className="rounded-2xl w-2/3 bg-crayola h-full"></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 justify-around">
          <div className="flex items-center gap-4">
            <div className="bg-queenBlue w-16 h-16 rounded-lg flex justify-center items-center shadow-md">
              <GamePad className="w-12 fill-lotion" />
            </div>
            <div>
              <span className="font-beaufort font-bold text-3xl">70</span>
              <p className="text-lotion/50">game played</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-queenBlue w-16 h-16 rounded-lg flex justify-center items-center shadow-md">
              <Star className="w-10 fill-lotion" />
            </div>
            <div>
              <span className="font-beaufort font-bold text-3xl">50</span>
              <p className="text-lotion/50">game wins</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-queenBlue w-16 h-16 rounded-lg flex justify-center items-center shadow-md">
              <CircleX className="w-10 fill-lotion" />
            </div>
            <div>
              <span className="font-beaufort font-bold text-3xl">20</span>
              <p className="text-lotion/50">game loses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
        <h2 className="capitalize mb-2 text-xl md:text-3xl">top game</h2>
        <GameResult />
      </div>
    </>
  );
}

export default OverView;
