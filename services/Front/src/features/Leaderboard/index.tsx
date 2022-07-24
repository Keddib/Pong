import Prize from "assets/images/prize.png";
import UserCard from "components/UserCard";
import Award from "assets/icons/award.svg";
import ElementBar from "components/ElementBar";
import Logo from "components/Logo";
import useMedia from "hooks/useMedia";
import { mediaQueries } from "config/index";

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

export default function Leaderboard() {
  const md = useMedia(mediaQueries.md);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <header className="bg-queenBlue/50 rounded-2xl p-4 relative md:h-[200px] pl-10 lg:pt-10">
        <div className="flex items-center gap-4">
          <Logo className="" />
          <h1 className="text-[70px] text-crayola">Pong</h1>
        </div>
        <h2 className="capitalize">Top players</h2>
        {md && (
          <img
            alt="prize"
            src={Prize}
            className="h-[200px] absolute bottom-0 right-10"
          />
        )}
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
              <ElementBar
                className="border-crayola hover:border-crayola"
                line="bg-crayola group-hover:bg-crayola"
              >
                <>
                  <Award className="w-6 h-6 fill-crayola" />
                  <div className="flex justify-between items-center w-full">
                    <UserCard user={user1} />
                    <span className="sm:mr-8">LVL</span>
                  </div>
                </>
              </ElementBar>
            </li>
            <li key={2 * 10}>
              <ElementBar className="" line="">
                <>
                  <Award className="w-6 h-6 fill-[#D7D7D7]" />
                  <div className="flex justify-between items-center w-full">
                    <UserCard user={user1} />
                    <span className="sm:mr-8">LVL</span>
                  </div>
                </>
              </ElementBar>
            </li>
            <li key={3 * 10}>
              <ElementBar className="" line="">
                <>
                  <Award className="w-6 h-6 fill-[#AD8A56]" />
                  <div className="flex justify-between items-center w-full">
                    <UserCard user={user1} />
                    <span className="sm:mr-8">LVL</span>
                  </div>
                </>
              </ElementBar>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
