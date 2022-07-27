import { Route, Routes, Navigate } from "react-router-dom";
import { FunctionComponent, useEffect, useState } from "react";
import Home from "features/Home";
import Friends from "features/Friends";
import Leaderboard from "features/Leaderboard";
import Messages from "features/Messages";
import Rooms from "features/Rooms";
import Profile from "features/Profile";
import Game from "features/Game";
import Error404 from "components/Error404";
import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";

const Section: FunctionComponent<{ setChatBar: (b: boolean) => void }> = ({
  setChatBar,
}) => {
  const xl = useMedia(mediaQueries.xl);
  const [isMessages, setIsMessasges] = useState(false);
  useEffect(() => {
    if (xl && !isMessages) {
      setChatBar(true);
    } else {
      setChatBar(false);
    }
  }, [xl, setChatBar, isMessages]);

  return (
    <section
      className={`Dash-main container ${
        xl && !isMessages ? "main-grid-xl" : ""
      }`}
    >
      <div className="dash-home-layout">
        <Routes>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route
            path="messages"
            element={<Messages setIsMessages={setIsMessasges} />}
          />
          <Route path="friends/*" element={<Friends />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </section>
  );
};

export default Section;
