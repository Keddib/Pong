import { Route, Routes } from "react-router-dom";
import TabBar from "/src/Components/TabBar";
import ProfileHeader from "./components/ProfileHeader";
import OverView from "./components/OverView";
import MatchHistory from "./components/MatchHistory";
import EditProfile from "./components/EditProfile";


const links = {
  first: {
    name: 'Overview',
    path: '/profile'
  },
  second: {
    name: 'Match History',
    path: 'match-history'
  }
}



export default function Profile() {


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
    </div >
  )
}
