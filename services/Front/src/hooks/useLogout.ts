import { axiosUsers, endSession } from "services/axios";
import useAuth from "./useAuth";

function useLogout() {
  const { signout } = useAuth();

  async function logout() {
    try {
      await endSession();
      signout();
    } catch (error) {
      console.log(error);
    }
  }

  return logout;
}

export default useLogout;
