import { createContext, useState, useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import axios from "/src/Services/api/axios";


const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  function signin(user) {
    setUser(user);
    setIsAuth(true);
  }
  function signout() {
    // notify back end to delete refresh token
    setUser({});
    setIsAuth(false);
  }
  function isUserAuth() {
    return isAuth;
  }
  return (
    <AuthContext.Provider value={{ user, signin, signout, isUserAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

function RequireAuth({ children }) {
  let { isUserAuth, signin } = useContext(AuthContext);
  let location = useLocation();

  if (isUserAuth()) {
    return children;
  } else {
    (async () =>{

      try {
        const response = await axios.get('/auth/isLogged',  { withCredentials: true })
        console.log(response);
        // set user navigate to dashboard
        signin(response.data);
        return children;
      } catch (e) {
        console.log(e);
      }
    })();
  }


  // if user comming to root '/' and not login redirect them to /welcome page
  if (location?.pathname == '/') {
    return <Navigate to="/welcome" replace />;
  }
  // otherwise
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  return <Navigate to="/access/signin" state={{ from: location }} replace />;
}



function RedirectAuth() {
  let { isUserAuth, user } = useContext(AuthContext);
  if (isUserAuth() && !user.isNew) {
    // if they are loged in, Redirect them to the /home page.
    // replace : true, so we don't create another entry in the history stack
    //for the login page.  This means that when they get to the /home page
    // and click the back button, they won't end up back on the login page,
    // which is also really nice for the user experience.
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}


export { RequireAuth, RedirectAuth }
