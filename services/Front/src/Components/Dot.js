const Dot = ({ className }) => {
  return (
    <span
      className={`relative inline-flex rounded-full h-3 w-3 ${className}`}
    ></span>
  );
};

function ShiningDot({ className }) {
  return (
    <span className="mr-1 inline-flex h-2 w-2 justify-center items-center">
      <span
        className={`animate-ping absolute inline-flex w-[10px] h-[10px] rounded-full opacity-75 ${className}`}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-2 w-2 ${className}`}
      ></span>
    </span>
  );
}

export { Dot, ShiningDot };
