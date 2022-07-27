import { Link } from "react-router-dom";
import PlayerImgUp from "assets/images/signup.png";
import Dialog from "pages/login/components/Dialog";
import AuthButton from "pages/login/components/AuthButton";
import ContinueDialog from "pages/login/components/UpdateProfile";
import useMedia from "hooks/useMedia";
import { FunctionComponent } from "react";
import { mediaQueries } from "config/index";

type Props = {
  isContinue: boolean;
  errorMsg: string;
  hundleSubmit: (e: React.FormEvent) => void;
};

const title = {
  primary: "Join us playing",
  secondary: "enjoy playing with your friends.",
};

const SignupDialog: FunctionComponent<Props> = ({
  isContinue,
  hundleSubmit,
  errorMsg,
}) => {
  const xl = useMedia(mediaQueries.xl);

  const error = errorMsg ? (
    <p className="text-center text-red/50">
      {`${errorMsg} ! please try agian`}
    </p>
  ) : (
    <></>
  );

  return (
    <main className="page-dark">
      <div className="signinDialogWrraper">
        <div className={`p-4 flex flex-col gap-y-8`}>
          {isContinue ? (
            <ContinueDialog />
          ) : (
            <Dialog title={title}>
              <>
                <form onSubmit={hundleSubmit}>
                  <AuthButton action="signup" />
                </form>
                {error}
                <p className="description-l">
                  Do you have an account?
                  <Link to="/access/signin" className="click-p-l ml-2">
                    Sign in!
                  </Link>
                </p>
              </>
            </Dialog>
          )}
        </div>
      </div>
      {xl && <LoginImage />}
    </main>
  );
};

export default SignupDialog;

const LoginImage = () => {
  return (
    <div className="img-w-signup">
      <img className="rounded-2xl" alt="player img" src={PlayerImgUp} />
    </div>
  );
};
