import { useState, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dialog from "pages/login/components/Dialog";
import useAuth from "hooks/useAuth";
import Image from "components/Image";
import { uploadData, validateInpute } from "./services";

const title = {
  primary: "welcome to",
  secondary: "enter nickname and change your picture",
};

function changeAvatar(event: any): void {
  if (event) {
    URL.createObjectURL(event?.target?.files[0]);
  }
}

const ContinueDialog: FunctionComponent = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, signin } = useAuth();
  const navigate = useNavigate();

  const userAvatar = user ? user.Avatar : "";
  async function submit(e: any) {
    e.preventDefault();
    const nickName = e.target.elements.nickName.value;
    const userImage = e.target.elements.userImage.files[0];

    // validate nickname
    if (validateInpute(nickName)) {
      return setError("nickname is required , max length is 35");
    }
    // get data to send wiith respone
    const data = new FormData();
    data.append("nickName", nickName);
    if (userImage) {
      data.append("userImage", userImage, userImage.name);
      //
    }
    // send response to update user
    try {
      setIsLoading(true);
      setError("");
      const user = await uploadData(data);
      setIsLoading(false);
      signin(user);
      navigate("/home", { replace: true });
    } catch (err) {
      setIsLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err?.message);
      } else {
        setError("upload filed! please try again");
      }
    }
  }

  return (
    <Dialog title={title}>
      <form className="flex flex-col gap-8 pt-4" onSubmit={submit}>
        <label htmlFor="photo" className="flex items-center gap-2">
          <div className="shrink-0 inline">
            <Image imageUrl={userAvatar} alt="user avatar" />
          </div>
          <span className="sr-only">Choose profile photo</span>
          <input
            onChange={changeAvatar}
            id="userImage"
            type="file"
            className="profile-picture-input"
          />
        </label>
        <label htmlFor="nickName" className="block font-poppins capitalize ">
          <span className="text-lotion">Nickname</span>
          <input
            id="nickName"
            placeholder="nickname"
            type="text"
            className="input--2 text-lotion border border-lotion placeholder-lotion/50"
          />
        </label>
        {error && <p className="text-red/70">{error}</p>}
        <button
          type="submit"
          className="button--2 flex justify-center items-center"
        >
          {isLoading ? "processing..." : "continue"}
        </button>
      </form>
    </Dialog>
  );
};

export default ContinueDialog;
