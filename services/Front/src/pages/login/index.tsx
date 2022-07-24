import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import {authenticateUser} from "services/axios";
import oAuthPopup from "./services/oauthPopup";
import SigninDialog from "./components/Signin";
import SignupDialog from "./components/Signup";

export default function Login() {
  const [code, seCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [called, setCalled] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();
  // const from = location.state;
  // console.log("signin, fro : ", from);

  const hundleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    oAuthPopup(seCode);
  };

  useEffect(() => {
    const getUserData = async () => {
      //  getUser
      const user = await authenticateUser(code, setErrorMsg);
      console.log("data", user);
      if (user) {
        if (user.isNew) {
          setIsContinue(true);
          navigate("/access/signup", { replace: true });
        } else {
          signin(user);
          navigate("/home", { replace: true });
        }
      }
    };
    if (!called) {
      if (code) {
        if (code == "error") {
          setErrorMsg("Authentication failed");
        } else {
          setCalled(true);
          getUserData();
        }
      }
    }
  }, [code, called, setErrorMsg, navigate, signin]);

  return (
    <Routes>
      <Route
        path="signin"
        element={
          <SigninDialog hundleSubmit={hundleSubmit} errorMsg={errorMsg} />
        }
      />
      <Route
        path="signup"
        element={
          <SignupDialog
            isContinue={isContinue}
            hundleSubmit={hundleSubmit}
            errorMsg={errorMsg}
          />
        }
      />
      <Route path="*" element={<Navigate to="/access/signin" />} />
    </Routes>
  );
}
