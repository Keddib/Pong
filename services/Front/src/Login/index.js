import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import useAuth from "/src/Hooks/useAuth";
import oAuthPopup from "/src/Services/Oauth42Popup";
import SigninDialog from "./components/SigninDialog";
import SignupDialog from "./components/SignupDialog";
import { authAPI } from "/src/Services/api/axios";


export default function Login() {


  let [code, seCode] = useState('');
  let [errorMsg, setErrorMsg] = useState('');
  let [called, setCalled] = useState(false);
  let [isContinue, setIsContinue] = useState(false);
  let { signin } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  console.log('signin, fro : ', from);

  const hundleSubmit = (e) => {
    e.preventDefault();
    oAuthPopup(seCode);
  };

  useEffect(() => {
    const authenticateUser = async () => {
      //  getUser
      let [data, status] = await authAPI(code, setErrorMsg);
      if (status != -1) {
        if (status == 201) {
          data.isNew = true;
          setIsContinue(true);
          navigate("/access/signup", { replace: true });
        }
        signin(data);
        if (status == 200) {
          console.log('signin', from);
          navigate(from, { replace: true });
        }
      }
    }
    if (!called) {
      if (code) {
        if (code == 'error') {
          setErrorMsg('Authentication failed');
        } else {
          setCalled(true);
          authenticateUser();
        }
      }
    }
  }, [code, called, setErrorMsg, navigate, signin, from]);

  return (
    <Routes>
      <Route path="signin" element={<SigninDialog hundleSubmit={hundleSubmit} errorMsg={errorMsg} />} />
      <Route path="signup" element={<SignupDialog isContinue={isContinue} hundleSubmit={hundleSubmit} errorMsg={errorMsg} />} />
      <Route path="*" element={<Navigate to="/access/signin" />} />
    </Routes>
  );
};
