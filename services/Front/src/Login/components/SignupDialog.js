import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import AuthButton from "./AuthButton";



const SignupDialog = () => {
  const title = {
    primary: "Join us playing",
    secondary: "enjoy playing with your friends."
  };
  return (
    <Dialog title={title}>
      <AuthButton action="signup" />
      <p className="description-l">
        Do you have an account?
        <Link to="/access/signin" className="click-p-l ml-2">
          Sign in!
        </Link>
      </p>
    </Dialog>
  );
}

export default SignupDialog;
