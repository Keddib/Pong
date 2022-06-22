import { useParams, Navigate } from "react-router-dom";
import { XL } from "/src/Components/Constants";
import useMedia from "/src/Hooks/useMedia";
import LoginImage from "./components/LoginImage";
import SigninDialog from "./components/SigninDialog";
import SignupDialog from "./components/SignupDialog";

const Login = () => {

  let { step } = useParams();
  let xl = useMedia(XL); // custom hook for media queries



  let isSignin = step === 'signin';

  return (
    <div className={`${isSignin ? "page-light" : "page-dark"}`}>
      <div className="signinDialogWrraper">
        <div className={`p-4 flex flex-col gap-y-8`}>
          {
            isSignin ? <SigninDialog />
              : step === 'signup' ?
                <SignupDialog />
                : <Navigate to="/access/signin" />
          }
        </div>
      </div>
      {xl && <LoginImage isSignin={isSignin} />}
    </div>
  );
};

export default Login;
