import { axiosUsers } from "services/axios";
import { User } from "types/user";

async function uploadData(data: FormData): Promise<User> {
  // send response to update user
  const res = await axiosUsers.put<User>(`/users/`, data, {
    withCredentials: true,
  });
  var user: User = res.data;
  return user;
}

function validateInpute(nickName: string): boolean {
  if (!nickName || nickName.length > 35) {
    return false;
  }
  return true;
}

export { uploadData, validateInpute };
