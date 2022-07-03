import { useNavigate } from "react-router-dom";

const Mode = ({ modeName, className, player }) => {


  let navigate = useNavigate();

  return (
    <div className={`${className}`}>
      <div className=" min-w-[200px] w-4/5 z-10">
        <h2 className=" font-beaufort">{modeName}</h2>
        <h4 className="text-lotion/50">1 vs 1</h4>
        <button
          onClick={() => { navigate('/game') }}
          className="uppercase button--2 mt-4  max-w-[200px]"
        >
          PLAY
        </button>
      </div>
      <img alt="player" src={player} />
    </div>
  );
};

export default Mode;
