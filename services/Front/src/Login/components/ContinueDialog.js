import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "./Dialog";
import useAuth from "/src/Hooks/useAuth";
import axios from "/src/Services/api/axios";

const title = {
  primary: "welcome to",
  secondary: "enter nickname and change your picture"
};


const ContinueDialog = () => {

  let [error, setError] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let { user, setUser } = useAuth();
  let [img, setImg] = useState(user.image_url);
  let navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    let nickName = e.target.elements.nickName.value;
    let userImage = e.target.elements.userImage.files[0];
    if (nickName.length > 35 || nickName.length == 0) {
      return setError('nickname is required , max length is 35');
    }
    // get data to send wiith respone
    const data = new FormData();
    data.append('nickName', nickName);
    if (userImage)
      data.append('userImage', userImage, userImage.name);
    // send response to update user
    try {
      setIsLoading(true);
      setError('');
      var res = await axios.put(`/users/${user.username}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${user.accessToken}`
          },
          withCredentials: true
        }
      )
      // I need to download images from back-end;
      setIsLoading(false);
      let newUser = res.data;
      delete user.isNew;
      setUser({ ...user, ...newUser })
      navigate('/home', { replace: true });

    } catch (err) {
      setIsLoading(false);
      setError(err?.message || "upload filed! please try again");
    }
  }

  useEffect(() => {
    setImg(user.image_url);
  }, [user]);

  return (
    <Dialog title={title}>
      <form className="flex flex-col gap-8 pt-4" onSubmit={submit} >
        <label htmlFor="photo" className="flex items-center gap-2">
          <div className="shrink-0 inline">
            <img className="h-16 w-16 object-cover rounded-full" src={img} alt="Current profile" />
          </div>
          <span className="sr-only">Choose profile photo</span>
          <input
            onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            id="userImage"
            type="file"
            className="profile-picture-input"
          />
        </label>
        <label htmlFor="nickName" className="block font-poppins capitalize " noValidate>
          <span className="text-lotion">
            Nickname
          </span>
          <input
            id='nickName'
            placeholder='nickname'
            type='text'
            className="input--2 text-lotion border border-lotion placeholder-lotion/50"
          />
        </label>
        {error && <p className="text-red/70">{error}</p>}
        <button type="submit" className="button--2 flex justify-center items-center">
          {
            isLoading ?
              <>
                <svg className="animate-bounce h-4 w-4 mr-3 rounded-full  bg-lotion" viewBox="0 0 24 24"></svg>
                processing...
              </>
              : 'continue'
          }
        </button>
      </form>
    </Dialog>
  );
}

export default ContinueDialog;
