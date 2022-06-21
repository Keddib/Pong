import { useState } from "react";
import Bell from "/src/assets/icons/bell.svg";
import Xmark from "/src/assets/icons/xmark.svg";
import Dropdown from "/src/Components/Dropdown";
import NotificationItem from "./NotificationItem";


const NewNotifications = (props) => {
  return (
    <>
      <NotificationItem action={props.action} />
      <NotificationItem action={props.action} />
      <NotificationItem action={props.action} />
      <NotificationItem action={props.action} />
    </>
  );
}

const NotificationsTitle = (props) => {
  return (
    <div className="flex justify-between">
      <p >Notifications </p>
      <button
        onClick={props.action}
      >
        <Xmark className="w-5 h-5 fill-lotion/50 hover:fill-lotion" />
      </button>
    </div>
  );
}

export default function Notifications() {

  let [show, setShow] = useState(false);
  let [news, setNews] = useState(true);

  function showDropDown() {
    if (news) {
      setNews(!news);
    }
    setShow(!show);
  }

  return (
    <div className="notifications">
      <span className={`top-0 ${news ? 'red-dot' : ''}`}></span>
      <button
        className="group bell-button"
        onClick={showDropDown}
      >
        <Bell className="iconBell" />
      </button>
      {
        show &&
        <Dropdown className="sm:w-[300px]">
          <NotificationsTitle action={showDropDown} />
          <NewNotifications action={showDropDown} />
        </Dropdown>
      }
    </div >
  );
}
