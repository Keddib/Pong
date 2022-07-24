import { Link } from "react-router-dom";
import PlayerImgIn from "assets/images/signin.png";
import Dialog from "pages/login/components/Dialog";
import AuthButton from "pages/login/components/AuthButton";
import { mediaQueries } from "config/index";
import useMedia from "hooks/useMedia";
import { FunctionComponent } from "react";

type Props = {
  errorMsg: string;
  hundleSubmit: (e: React.FormEvent) => void;
};

const title = {
  primary: "welcome to",
  secondary: "Please login with your intra42 account",
};

const SigninDialog: FunctionComponent<Props> = ({ hundleSubmit, errorMsg }) => {
  const xl = useMedia(mediaQueries.xl);

  const error = errorMsg ? (
    <p className="text-center text-red/50">
      {`${errorMsg} ! please try agian`}
    </p>
  ) : (
    <></>
  );

  return (
    <main className="page-light">
      <div className="signinDialogWrraper">
        <div className={`p-4 flex flex-col gap-y-8`}>
          <Dialog title={title}>
            <>
              <form onSubmit={hundleSubmit}>
                <AuthButton action="signin" />
              </form>
              {error}
              <p className="description">
                Don’t have an account?
                <Link to="/access/signup" className="click-p-l ml-2">
                  Sign up fo free!
                </Link>
              </p>
            </>
          </Dialog>
        </div>
      </div>
      {xl && <LoginImage />}
    </main>
  );
};

export default SigninDialog;

const LoginImage = () => {
  return (
    <div className="img-w-signin">
      <img className="rounded-2xl" alt="player img" src={PlayerImgIn} />
    </div>
  );
};
