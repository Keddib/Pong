import UserCard from "components/Usercard";
import Logo from "components/Logo";
import { FunctionComponent } from "react";
import { User } from "types/user";

type IStatus = "online" | "offline" | "playing" | "spectating";

var user1 = {
  id: 12134,
  Username: "AlaeOX7",
  Nickname: "AlaeOX7",
  Status: "online" as IStatus,
  Avatar: "http://localhost:3500/upload/402e5238f17f06fc7b8d08617758bb8c.jpg",
  Wins: 100,
  Losses: 60,
  XP: 439,
  Level: 11,
};

function LoadingPlayer() {
  return (
    // <div className=" w-fit flex items-center">
    //   <div className="rounded-full w-16 h-16 bg-queenBlue/50 mr-2"></div>
    //   <div className="grow flex flex-col gap-1">
    //     <div className="rounded-3xl h-4 w-20 bg-queenBlue"></div>
    //     <div className="rounded-3xl h-3 w-16 bg-queenBlue"></div>
    //   </div>
    // </div>
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full w-16 h-16 bg-queenBlue/70"></div>
      <div className="flex-1 space-y-2 pt-2">
        <div className="h-4 w-24 bg-queenBlue/70 rounded-2xl"></div>
        <div className="w-16">
          <div className="h-[12px] bg-queenBlue/70 rounded-2xl col-span-1"></div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  opponent: User;
  setGameState: (state: string) => void;
};

const Waiting: FunctionComponent<Props> = ({ opponent, setGameState }) => {
  return (
    <div className="m-auto w-full pt-8 flex flex-col items-center gap-10">
      <Logo className="animate-bounce" />
      <p className="text-xl font-poppins">wating for opponent...</p>
      <div className="players flex flex-col gap-10 sm:flex-row items-center">
        <UserCard user={user1} />
        <h3 className="text-crayola font-light">VS</h3>
        {opponent ? <UserCard user={opponent} /> : <LoadingPlayer />}
      </div>
      <button
        onClick={() => setGameState("canceled")}
        className="button--5 w-40"
      >
        cancel
      </button>
    </div>
  );
};

export default Waiting;
