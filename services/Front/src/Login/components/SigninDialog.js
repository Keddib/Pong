import { Link } from "react-router-dom";
import PlayerImgIn from "/src/assets/images/signin.png";
import Dialog from "./Dialog";
import AuthButton from "./AuthButton";
import { XL } from "/src/Components/Constants";
import useMedia from "/src/Hooks/useMedia";



const title = {
  primary: "welcome to",
  secondary: "Please login with your intra42 account"
};



const SigninDialog = ({ hundleSubmit, errorMsg }) => {

  let xl = useMedia(XL);

  return (
    < main className="page-light">
      <div className="signinDialogWrraper">
        <div className={`p-4 flex flex-col gap-y-8`}>
          <Dialog title={title}>
            <form onSubmit={hundleSubmit}>
              <AuthButton action="signin" />
            </form>
            {errorMsg &&
              <p className="text-center text-red/50">
                {`${errorMsg} ! please try agian`}
              </p>
            }
            <p className="description">
              Don’t have an account?
              <Link to="/access/signup" className="click-p-l ml-2">
                Sign up fo free!
              </Link>
            </p>
          </Dialog>
        </div>
      </div>
      {xl && <LoginImage />}
    </main >
  );
}

export default SigninDialog;


const LoginImage = () => {

  return (
    <div className="img-w-signin">
      <img className="rounded-2xl" alt="player img" src={PlayerImgIn} />
    </div>
  );
}
