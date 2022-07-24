import { axiosUsers } from "services/axios";
import useAuth from "./useAuth";

function useLogout() {
  const { signout } = useAuth();

  async function logout() {
    try {
      await axiosUsers("/users/logout", { withCredentials: true });
      signout();
    } catch (error) {
      console.log(error);
    }
  }

  return logout;
}

export default useLogout;
