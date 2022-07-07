import { MD } from "/src/Components/Constants";
import Logo from "/src/Components/Logo";
import Prize from "/src/assets/images/prize.png"
import useMedia from "/src/Hooks/useMedia";
import ElementBar from "/src/Components/ElementBar";
import UserCard from "/src/Components/UserCard";
import UserImg from "/src/assets/images/user.jpg"
import Award from "/src/assets/icons/award.svg";

var user1 = {
  id: "123",
  img: UserImg,
  username: "AlaeOX7",
  status: "Online",
  dot: "green-dot"
};


export default function Leaderboard() {

  let md = useMedia(MD);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <header className="bg-queenBlue/50 rounded-2xl p-4 relative md:h-[200px] pl-10 lg:pt-10">
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="text-[70px] text-crayola">Pong</h1>
        </div>
        <h2 className="capitalize">Top players</h2>
        {md && <img alt="prize" src={Prize} className="h-[200px] absolute bottom-0 right-10" />}
      </header>
      <div className="bg-queenBlue/50 rounded-2xl py-4 pl-4 flex flex-col gap-4">
        <div className=" w-full flex justify-between pr-8 sm:pr-16">
          <div className="grow pl-10">
            <span className="mr-10">RANK</span>
            <span className="">PLAYER</span>
          </div>
          <span className="text-end ">XP</span>
        </div>
        <div className="Rank">
          <ul className="flex flex-col gap-2">
            <li key={1 * 10}>
              <ElementBar className="border-crayola hover:border-crayola" line="bg-crayola group-hover:bg-crayola">
                <Award className="w-6 h-6 fill-crayola" />
                <div className="flex justify-between items-center w-full">
                  <UserCard user={user1} />
                  <span className="sm:mr-8">LVL</span>
                </div>
              </ElementBar>
            </li>
            <li key={2 * 10}>
              <ElementBar >
                <Award className="w-6 h-6 fill-[#D7D7D7]" />
                <div className="flex justify-between items-center w-full">
                  <UserCard user={user1} />
                  <span className="sm:mr-8">LVL</span>
                </div>
              </ElementBar>
            </li>
            <li key={3 * 10}>
              <ElementBar >
                <Award className="w-6 h-6 fill-[#AD8A56]" />
                <div className="flex justify-between items-center w-full">
                  <UserCard user={user1} />
                  <span className="sm:mr-8">LVL</span>
                </div>
              </ElementBar>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
