import { SM } from "/src/Components/Constants";
import { useState } from "react";
import useMedia from "/src/Hooks/useMedia";
import Logo from "/src/Components/Logo";
import Bars from "/src/assets/icons/bars.svg";
import Navbar from "./components/Navbar";



const Nav = () => {

  const [showNav, setShowNav] = useState(false);
  const smDevice = useMedia(SM);

  function hundleClick() {
    setShowNav(!showNav);
  }

  let showIt = showNav;

  // Always show it excep on small device
  // on small device show nav on click

  return (
    <aside className="navbar ">
      <Logo className={smDevice && "group-hover:animate-bounce"} />
      {(showIt || smDevice) && <Navbar veiw={smDevice} showNav={hundleClick} />}
      <button onClick={hundleClick} className="group nav-btn">
        <Bars className="nav-icon" />
      </button>
    </aside>
  );
};

export default Nav;
