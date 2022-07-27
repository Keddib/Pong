import BackImg from "assets/images/Dashboard.jpg";
import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import ChatBar from "./chatbar";
import Main from "./main";

const Dashboard = () => {
  const [chatBar, setChatBar] = useState(true);

  return (
    <main
      className="page backGround-img"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="page bg-gradient-to-t from-spaceCadet to-spaceCadet/70">
        <div className="dash-layout">
          <Sidebar />
          <Header />
          <Main setChatBar={setChatBar} />
          {chatBar && <ChatBar />}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
