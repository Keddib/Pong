import NavBar from "./navbar/NavBar";
import Loading from "../Components/Loading"
const Dashboard = () => {
  return (
    <div className="w-full h-full overflow-scroll bg-queenBlue flex">
      <NavBar />
      <Loading />
    </div>
  );
};

export default Dashboard;
