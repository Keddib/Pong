import Pong from "../Pong";
import React, { useEffect, useState, useRef, FunctionComponent } from "react";
import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import UserCard from "components/Usercard";
import { User } from "types/user";

type Players = User[];

type Props = {
  players: Players;
  socket: any;
  gameStateData: any;
};

const PlayersBar: FunctionComponent<{ players: User[] }> = ({ players }) => {
  return (
    <div className="players flex gap-2 items-center justify-between rounded-3xl bg-queenBlue/50 py-8 px-2 md:px-10">
      <UserCard user={players[0]} />
      <h3 className="text-crayola font-light text-sm md:text-3xl">VS</h3>
      <UserCard user={players[1]} />
    </div>
  );
};

const Play: FunctionComponent<Props> = (props) => {
  const parentRef = useRef(null);
  const sm = useMedia(mediaQueries.sm);
  const [sectionWidth, setSectionWidth] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setup = () => {
      setSectionWidth(parentRef.current.clientWidth);
      setSectionHeight(parentRef.current.clientHeight);
      setReady(true);
    };
    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, []);

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4 justify-center">
      {sm && <PlayersBar players={props.players} />}
      <div
        ref={parentRef}
        className="gameComponent w-full align-center grow rounded-3xl"
      >
        {ready && (
          <Pong
            gameStateData={props.gameStateData}
            socket={props.socket}
            width={sectionWidth}
            height={sectionHeight}
          />
        )}
      </div>
    </div>
  );
};

export default Play;
