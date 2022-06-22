import { useContext, createContext, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";


/**
 * This represents some generic auth provider API, like Firebase.
 */

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { fakeAuthProvider };

export let AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/access/signin" state={{ from: location }} replace />;
  }

  return children;
}

function RedirectAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  let from = location?.state?.from.pathname || '/app/';

  if (auth.user) {
    // if they are loged in, Redirect them to the /app page.
    // replace : true, so we don't create another entry in the history stack
    //for the login page.  This means that when they get to the /app page
    // and click the back button, they won't end up back on the login page,
    // which is also really nice for the user experience.
    return <Navigate to={from} replace={true} />;
  }

  return children;
}


export { RequireAuth, RedirectAuth }
