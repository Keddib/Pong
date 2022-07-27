import { axiosUsers } from "services/axios";

function validateInpute(nickName: string): boolean {
  if (!nickName || nickName.length > 35) {
    return false;
  }
  return true;
}

export { uploadData, validateInpute };
