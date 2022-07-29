import React, { lazy, Suspense, StrictMode } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import { RequireAuth, RedirectAuth } from "./components/AuthRedirection";
import AuthRedirection from "./components/AuthRedirectionPage";

import Loading from "components/Loading";
import Error404 from "components/Error404";
import UserSession from "./components/UserSession";

const Welcome = lazy(() => import("pages/welcome"));
const Login = lazy(() => import("pages/login"));
const Dashboard = lazy(() => import("pages/dashboard"));

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<UserSession />}>
                <Route element={<RedirectAuth />}>
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/access/*" element={<Login />} />
                </Route>

                <Route path="/auth/" element={<AuthRedirection />} />

                <Route
                  path="/*"
                  element={
                    <RequireAuth>
                    <Dashboard />
                    </RequireAuth>
                  }
                />
              </Route>
              {/* <Route path="*" element={<Error404 />} /> */}
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
