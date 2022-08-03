import axios from "axios";
import { api } from "config/index";

const axiosUsers = axios.create({
  baseURL: api.users,
});

import { User } from "types/user";

async function getUser(uid: string): Promise<User> {
  // send response to update user
  const res = await axiosUsers.get<User>("/user/"+uid, {
    withCredentials: true,
  });
  var user: User = res.data;
  return user;
}

async function updateUser(data: FormData): Promise<User> {
  // send response to update user
  const res = await axiosUsers.put<User>(`/user/`, data, {
    withCredentials: true,
  });
  var user: User = res.data;
  return user;
}

const authenticateUser = async (
  code: string,
  setError: (message: string) => void
) => {
  try {
    const res = await axiosUsers.get<User>("/auth/intra", {
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

async function checkUserSession(): Promise<User | null> {
  try {
    const res = await axiosUsers.get<User>("/auth/isLogged", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
    } else {
      console.log(error);
    }
  }
  return null;
}

async function endSession() {
  try {
    await axiosUsers("/auth/logout", { withCredentials: true });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
    } else {
      console.log(error);
    }
  }
}

export { updateUser, authenticateUser, checkUserSession, endSession, getUser };
