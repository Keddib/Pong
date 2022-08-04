
import { useContext } from "react";
import AuthContext from "src/context/authentication";

export default function useAuth() {
  return useContext(AuthContext);
}

