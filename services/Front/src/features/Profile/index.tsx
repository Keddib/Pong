import { Route, Routes } from "react-router-dom";
import TabBar from "components/TabBar";
import ProfileHeader from "./components/Profileheader";
import OverView from "./components/Overview";
import MatchHistory from "./components/Matchhistory";
import EditProfile from "./components/Updateprofile";
import UserSession from "~/src/components/App/components/UserSession";
import { useEffect } from "react";
import { axiosUsers } from "~/src/services/axios";
import useAuth from "~/src/hooks/useAuth";
import { User } from "~/src/types/user";

const links = {
  first: {
    name: "Overview",
    path: "/profile",
  },
  second: {
    name: "Match History",
    path: "match-history",
  },
};

export default function Profile() {
  const {signin}  = useAuth()
  useEffect(()=>{
      axiosUsers.get<User>("/auth/isLogged", {
        withCredentials: true,
      }).then((res )=>{
        if(res.data){
          signin(res.data);
        }
      })
    },[])

  return (
    <div className="m-auto w-full h-full flex flex-col gap-4">
      <ProfileHeader />
      <div className="bg-queenBlue/50 rounded-2xl md:p-2 py-4  flex flex-col gap-4">
        <TabBar links={links} />
        <Routes>
          <Route index element={<OverView />} />
          <Route path="match-history" element={<MatchHistory />} />
          <Route path="edit" element={<EditProfile />} />
        </Routes>
      </div>
    </div>
  );
}
