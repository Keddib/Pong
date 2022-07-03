import { SM } from "/src/Components/Constants";
import useMedia from "/src/Hooks/useMedia";
import UserCard from "/src/Components/UserCard";


function PlayersBar({ players }) {

  return (
    <div className="players flex gap-2 items-center justify-between rounded-3xl bg-queenBlue/50 py-8 px-2 md:px-10">
      <UserCard user={players[0]} />
      <h3 className='text-crayola font-light text-sm md:text-3xl'>VS</h3>
      <UserCard user={players[1]} />
    </div>
  );
}


export default function Play(props) {

  let sm = useMedia(SM);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4 justify-center">
      {sm && <PlayersBar players={props.players} />}
      <div className="gameComponent w-full bg-black h-3/4 rounded-3xl">
      </div>
    </div>
  );
}
