import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { FunctionComponent } from "react";

type Props = {
  children: JSX.Element;
};

const RequireAuth: FunctionComponent<Props> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  console.log(auth);
  if (auth.isUserAuth()) {
    return children;
  }
  // if user comming to root '/' and not login redirect them to /welcome page
  if (location?.pathname == "/") {
    return <Navigate to="/welcome" replace />;
  }
  // otherwise
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return <Navigate to="/access/signin" state={{ from: location }} replace />;
};

const RedirectAuth = () => {
  const { isUserAuth } = useAuth();

  if (isUserAuth()) {
    // if they are loged in, Redirect them to the /home page.
    // replace : true, so we don't create another entry in the history stack
    //for the login page.  This means that when they get to the /home page
    // and click the back button, they won't end up back on the login page,
    // which is also really nice for the user experience.
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export { RequireAuth, RedirectAuth };
