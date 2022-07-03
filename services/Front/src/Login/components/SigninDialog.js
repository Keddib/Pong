import { Link } from "react-router-dom";
import LoginImage from "./LoginImage";
import Dialog from "./Dialog";
import AuthButton from "./AuthButton";
import Error from "./LoginError";
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
            {errorMsg && <Error message={errorMsg} />}
            <p className="description">
              Don’t have an account?
              <Link to="/access/signup" className="click-p-l ml-2">
                Sign up fo free!
              </Link>
            </p>
          </Dialog>
        </div>
      </div>
      {xl && <LoginImage isSignin={true} />}
    </main >
  );
}

export default SigninDialog;
