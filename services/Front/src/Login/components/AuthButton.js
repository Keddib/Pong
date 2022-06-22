import I42 from "/src/assets/images/42.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "/src/Auth";
import oAuthPopup from "/src/Auth/Oauth42Popup";
import { useState } from "react";

const AuthButton = (props) => {

  let [code, setCode] = useState('');
  let navigate = useNavigate();
  let location = useLocation();
  let authContext = useAuth();

  let from = location.state?.from?.pathname || "/";

  if (code) {
    if (code == 'error') {
      console.log('error from Oauth popup');
    } else {
      console.log(code);
      authContext.signin('newUser', () => {
        navigate(from, { replace: true });
      });
    }
  }

  return (
    <>
      <button
        onClick={() => { oAuthPopup(setCode); }}
        className={`button--42 ${props.action}`}
      >
        <I42 className="mr-2 !fill-crayola" />
        {`${props.action} with 42`}
      </button>
      {code == 'error' && <p className="text-center text-red/50">something went wrong, please try agian</p>}
    </>
  );
}

export default AuthButton;
