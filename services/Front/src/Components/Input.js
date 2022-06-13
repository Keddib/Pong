// import Photo from "../../public/assets/images/photo.png"
import CameraIcon from "../../public/assets/icons/camera.svg"

const Input = ({ id, type, dark }) => {
  return (
    <label htmlFor={id} className="block font-poppins capitalize mb-10">
      <span
        className={`block text-base font-medium ${dark ? "text-spaceCadet" : "text-lotion"
          }`}
      >
        {id}
      </span>
      <input
        id={id}
        // value={id}
        placeholder={id}
        type={type}
        className={`inputElem ${dark
          ? "text-spadeCadet border border-spaceCadet placeholder-spaceCadet/50"
          : "text-lotion border border-lotion placeholder-lotion/50"
          }`}
      />
    </label>
  );
};

export const InputPhoto = () => {
  return (
    <label htmlFor="dropzone-file" className="flex items-center w-fit mb-4">
      <div className="group flex flex-col mr-4 justify-center items-center w-20 rounded-full border-2 border-lotion/50 border-dashed cursor-pointer hover:border-lotion">
        <div className="flex flex-col justify-center items-center pt-5 pb-6">
          <CameraIcon className="w-8 fill-lotion/50 group-hover:fill-lotion" />
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </div>
      <span className="block text-base font-medium text-lotion">Add photo</span>
    </label>
  );
};

export default Input;
