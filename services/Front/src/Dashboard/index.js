import { useState } from "react";
import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import { io } from "socket.io-client";
// import useAuth from "/src/Hooks/useAuth";
import BackImg from "/src/assets/images/Dashboard.jpg";
import Sidebar from "./Sidebar"
import Header from "./Header/";
import ChatBar from "./ChatBar/";



const Dashboard = () => {

  // let { user } = useAuth();

  // useEffect(() => {
  // console.log('called');
  // const socket = io("http://localhost:3500", {
  //   path: '/chat',
  //   withCredentials: true,
  //   auth: {
  //     token: user.accessToken
  //   }
  // });

  //   socket.on("connect", () => {
  //     console.log('io client connected...');
  //   });
  //   socket.on("connect_error", () => {
  //     console.log('io connection error');
  //   });
  //   socket.on("disconnect", () => {
  //     console.log('io connection closed');
  //   });

  //   return (() => socket.disconnect());
  // }, [user])

  let [chatBar, setChatBar] = useState(true)

  return (
    <main
      className="page backGround-img"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="page bg-gradient-to-t from-spaceCadet to-spaceCadet/70">
        <div className="dash-layout">
          <Sidebar />
          <Header />
          <Outlet context={[setChatBar]} />
          {chatBar && <ChatBar />}
        </div>
      </div>
    </main >
  );
};

export default Dashboard;
