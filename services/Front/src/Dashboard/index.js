import { Outlet } from "react-router-dom";
import BackImg from "/src/assets/images/Dashboard.jpg";
import Sidebar from "./Sidebar"
import Header from "./Header/";
import ChatBar from "./ChatBar/";

const Dashboard = () => {
  return (
    <main
      className="page backGround-img"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="page bg-gradient-to-t from-spaceCadet to-spaceCadet/70">
        <div className="dash-layout">
          <Sidebar />
          <Header />
          <Outlet />
          <ChatBar />
        </div>
      </div>
    </main >
  );
};

export default Dashboard;
