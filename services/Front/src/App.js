import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { AuthProvider, RequireAuth, RedirectAuth } from "./Context/authProvider";
import Loading from "/src/Components/Loading";
import Error404 from "./Components/404";


const Landing = lazy(() => import("/src/Landing"));
const Login = lazy(() => import("./Login"));
const Dashboard = lazy(() => import("./Dashboard"));
const Section = lazy(() => import("./Dashboard/Section"));

const App = () => {

  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>

          <Route element={<RedirectAuth />}>
            <Route path="/welcome" element={<Landing />} />
            <Route path="/access/*" element={<Login />} />
          </Route>


          <Route path="/*" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Section page='home' />} />
            <Route path="game" element={<Section page='game' />} />
            <Route path="leaderboard" element={<Section page='leaderboard' />} />
            <Route path="messages" element={<Section page='messages' />} />
            <Route path="friends/*" element={<Section page='friends' />} />
            <Route path="rooms" element={<Section page='rooms' />} />
            <Route path="profile/*" element={<Section page='profile' />} />
          </Route>

          <Route path="*" element={<Error404 />} />

          {/* path for Oauth 42 redirection */}
          <Route path="/auth42/" element={<Auth42 />} />

        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;


function Auth42() {

  let [searchParams] = useSearchParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (!searchParams.get('code'))
      navigate('/', { replace: true });
  });

  return (
    <div className="w-full h-full bg-spaceCadet flex flex-col justify-center items-center">
      <h1 className="text-lotion">Pong</h1>
      <p className="text-lotion">Your are successfully redirected you can close this tap</p>
    </div>
  );
}
