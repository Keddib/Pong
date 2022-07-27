import { FunctionComponent, useState } from "react";
import AuthContext from "src/context/authentication";
import { User } from "types/user";
import { Context } from "types/context";
import useLogout from "~/src/hooks/useLogout";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState({} as User);
  const [isAuth, setIsAuth] = useState(false);

  function signin(user: User) {
    setUser(user);
    setIsAuth(true);
  }
  function signout() {
    // notify back end to delete session
    setUser({} as User);
    setIsAuth(false);
    // redirect to login
  }
  function isUserAuth() {
    return isAuth;
  }
  return (
    <AuthContext.Provider
      value={{ user, signin, signout, isUserAuth } as Context}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
