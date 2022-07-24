import axios from "axios";
import { axiosUsers } from "services/axios";

import { User } from "types/user";

const authenticateUser = async (
  code: string,
  setError: (message: string) => void
) => {
  try {
    const res = await axiosUsers.get<User>("/auth", {
      headers: { "Content-Type": "application/json" },
      params: { code: code },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("No Server Response");
      }
    } else {
      setError("Login Failed");
    }
    return null;
  }
};
export default authenticateUser;
