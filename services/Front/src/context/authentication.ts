import { createContext } from "react";
import { Context } from "~/src/types/context";
import { User } from "~/src/types/user";

const AuthContext = createContext<Context>({
  user: {} as User,
  isUserAuth: () => false,
  signin: (user: User) => {
    console.log(user);
  },
  signout: () => {},
});

export default AuthContext;
