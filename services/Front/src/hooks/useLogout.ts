import { endSession } from "services/axios";
import useAuth from "./useAuth";

function useLogout() {
  const { signout } = useAuth();

  async function logout() {
    await endSession();
    signout();
  }

  return logout;
}

export default useLogout;
