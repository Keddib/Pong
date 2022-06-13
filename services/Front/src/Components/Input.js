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
  return <div>file</div>;
};

export default Input;
