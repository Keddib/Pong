import axios from "axios";
import {api } from "config/index";


const axiosUsers = axios.create({
  baseURL: api.users,
});


import { User } from "types/user";

async function updateUser(data: FormData): Promise<User> {
  // send response to update user
  const res = await axiosUsers.put<User>(`/users/`, data, {
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


export { axiosUsers, updateUser, authenticateUser, checkUserSession };
