import React, { useEffect, useState, useRef, FunctionComponent } from "react";
import Pong from "features/Game/components/Pong";
import useMedia from "hooks/useMedia";
import UserCard from "components/Usercard";
import { mediaQueries } from "config/index";
import { User } from "types/user";

type IProps = {
  players: User[];
  gameStateData?: any;
  socket?: any;
};

const PlayersBar: FunctionComponent<IProps> = ({ players }) => {
  return (
    <div className="players flex gap-2 items-center justify-between rounded-3xl bg-queenBlue/50 py-8 px-2 md:px-10">
      <UserCard user={players[0]} />
      <h3 className="text-crayola font-light text-sm md:text-3xl">VS</h3>
      <UserCard user={players[1]} />
    </div>
  );
};

const Play: FunctionComponent<IProps> = (props) => {
  const parentRef = useRef(null);
  const sm = useMedia(mediaQueries.sm);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setup = () => {
      if (parentRef != null) {
        setSectionWidth(parentRef.current?.clientWidth);
        setSectionHeight(parentRef.current?.clientHeight);
      }
      //console.log(parentRef.current);
      setReady(true);
    };
    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, []);

  //console.log('start', sectionWidth, sectionHeight);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4 justify-center">
      {sm && <PlayersBar players={props.players} />}
      <div
        ref={parentRef}
        className="gameComponent w-full align-center grow rounded-3xl"
      >
        {ready && (
          <Pong
            width={sectionWidth}
            height={sectionHeight}
            initBallX={500}
            initBallY={350}
            ballRadius={50}
            ballSpeed={10}
            paddleWidth={30}
            paddleHeight={800}
            paddleSpeed={10}
            gameStateData={props.gameStateData}
            socket={props.socket}
          />
        )}
      </div>
    </div>
  );
};

export default Play;
