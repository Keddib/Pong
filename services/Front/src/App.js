import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider, RequireAuth, RedirectAuth } from "./Auth";
import Loading from "/src/Components/Loading";

const Dashboard = lazy(() => import("./Dashboard"));
const Landing = lazy(() => import("/src/Home"));
const Login = lazy(() => import("./Login"));



const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={
            // <RedirectAuth>
              <Landing />
            // </RedirectAuth>
          } />
          <Route path="/app/*"
            element={
              // <RequireAuth>
                <Dashboard />
              // </RequireAuth>
            } />

          <Route path="/access/:step"
            element={
              <RedirectAuth>
                <Login />
              </RedirectAuth>
            } />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
