import { useState } from "react";
import Bars from "assets/icons/bars.svg";
import useMedia from "hooks/useMedia";
import Logo from "components/Logo";
import Navbar from "./components/Navbar";
import { mediaQueries } from "config/index";

const Nav = () => {
  const [showNav, setShowNav] = useState(false);
  const smDevice = useMedia(mediaQueries.sm);

  function hundleClick() {
    setShowNav(!showNav);
  }

  const showIt = showNav;

  // Always show it excep on small device
  // on small device show nav on click

  return (
    <aside className="navbar ">
      <Logo className={smDevice ? "group-hover:animate-bounce" : ""} />
      {(showIt || smDevice) && <Navbar showNav={hundleClick} />}
      <button onClick={hundleClick} className="group nav-btn">
        <Bars className="nav-icon" />
      </button>
    </aside>
  );
};

export default Nav;
