import { useState } from "react";
import useAuth from "/src/Hooks/useAuth";
import Image from "/src/Components/Image";

function EditProfile() {

  let { user } = useAuth();
  let [image, setImage] = useState(user.image_url);
  let [error, setError] = useState('');

  return (
    <div className="rounded-2xl bg-spaceCadet p-2 md:p-4 flex flex-col gap-2">
      <h2 className="mb-2 capitalize text-xl md:text-3xl">Edit Profile</h2>
      <div className="w-full flex justify-center">

        <form className="flex flex-col gap-8 pt-4 w-full max-w-[400px]">
          <label htmlFor="photo" className="flex items-center gap-2">
            <div className="shrink-0 inline h-16 w-16 ">
              <Image className="object-cover rounded-full" imageUrl={image} alt="Current profile" />
            </div>
            <span className="sr-only">Choose profile photo</span>
            <input
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
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
            continue
          </button>
        </form>
        <button
          onClick={() => setError('')}
        >

        </button>
      </div>
    </div>
  );
}

export default EditProfile;
