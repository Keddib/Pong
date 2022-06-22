import { Link } from "react-router-dom";
import Dialog from "./Dialog";
import AuthButton from "./AuthButton";


const SigninDialog = () => {
  const title = {
    primary: "welcome to",
    secondary: "Please login with your intra42 account"
  };
  return (
    <Dialog title={title}>
      <AuthButton action="signin" />
      <p className="description">
        Don’t have an account?
        <Link to="/access/signup" className="click-p-l ml-2">
          Sign up fo free!
        </Link>
      </p>
    </Dialog>
  );
}

export default SigninDialog;
