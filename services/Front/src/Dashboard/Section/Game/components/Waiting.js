import UserCard from "/src/Components/UserCard";
import Logo from "/src/Components/Logo";
import UserImg from "/src/assets/images/user.jpg";

var user1 = {
  id: "123",
  img: UserImg,
  name: "AlaeOX7",
  status: "Online",
  dot: "green-dot"
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


export default function Waiting({ opponent, setGame }) {

  return (
    <div className="m-auto w-full pt-8 flex flex-col items-center gap-10">
      <Logo className="animate-bounce" />
      <p className="text-xl font-poppins">wating for opponent...</p>
      <div className="players flex flex-col gap-10 sm:flex-row items-center">
        <UserCard user={user1} />
        <h3 className='text-crayola font-light'>VS</h3>
        {opponent ? <UserCard user={opponent} /> : <LoadingPlayer />}
      </div>
      <button
        onClick={() => setGame('canceled')}
        className="button--5 w-40"
      >
        cancel
      </button>
    </div>
  );

}
