import { Link } from "react-router-dom";
import PlayerImgUp from "/src/assets/images/signup.png";
import Dialog from "./Dialog";
import AuthButton from "./AuthButton";
import ContinueDialog from "./ContinueDialog";
import useMedia from "/src/Hooks/useMedia";
import { XL } from "/src/Components/Constants";


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
                {errorMsg && <p className="text-center text-red/50">
                  {`${errorMsg} ! please try agian`}
                </p>}
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
      {xl && <LoginImage />}
    </main >
  );
}

export default SignupDialog;

const LoginImage = () => {

  return (
    <div className="img-w-signup">
      <img className="rounded-2xl" alt="player img" src={PlayerImgUp} />
    </div>
  );
}
