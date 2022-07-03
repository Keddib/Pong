import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import AuthButton from "./AuthButton";
import Error from "./LoginError";
import ContinueDialog from "./ContinueDialog";
import useMedia from "/src/Hooks/useMedia";
import { XL } from "/src/Components/Constants";
import LoginImage from "./LoginImage";


const title = {
  primary: "Join us playing",
  secondary: "enjoy playing with your friends."
};


const SignupDialog = ({ isContinue, hundleSubmit, errorMsg }) => {

  let xl = useMedia(XL);

  return (

    < main className="page-dark">
      <div className="signinDialogWrraper">
        <div className={`p-4 flex flex-col gap-y-8`}>
          {
            isContinue ?
              <ContinueDialog />
              :
              <Dialog title={title}>
                <form onSubmit={hundleSubmit}>
                  <AuthButton action="signup" />
                </form>
                {errorMsg && <Error />}
                <p className="description-l">
                  Do you have an account?
                  <Link to="/access/signin" className="click-p-l ml-2">
                    Sign in!
                  </Link>
                </p>
              </Dialog>
          }
        </div>
      </div>
      {xl && <LoginImage isSignin={false} />}
    </main >
  );
}

export default SignupDialog;
