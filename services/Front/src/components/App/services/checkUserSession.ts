import { axiosUsers } from "services/axios";
import { User } from "types/user";

async function checkUserSession(): Promise<User | null> {
  try {
    const res = await axiosUsers.get<User>("/status", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export default checkUserSession;
