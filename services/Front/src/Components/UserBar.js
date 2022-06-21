import { useState } from "react";
import User from "./UserCard";
import Dots from "/src/assets/icons/ellipsis.svg";
import Dropdown from "/src/Components/Dropdown";


const Options = (props) => {

  let [show, setShow] = useState(false);

  function hundleClick() {
    setShow(!show);
  }

  return (
    <div className="relative">
      <button
        className="w-8 h-8 "
        onClick={hundleClick}
        onBlur={() => { if (show) setShow(!show) }}
      >
        <Dots className="nav-icon" />
      </button>
      {
        show &&
        <Dropdown className='top-6'>
          {props.children}
        </Dropdown>
      }
    </div>
  );
}


const UserBar = (props) => {

  return (
    <li className="group userBar">
      <div className="userBarLine"></div>
      <User user={props.user} />
      <Options >
        <p>hello one</p>
      </Options>
    </li>
  );
};

export default UserBar;
