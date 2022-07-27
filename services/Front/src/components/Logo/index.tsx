import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const Logo: FunctionComponent<{ className: string }> = ({ className }) => {
  return (
    <Link
      to="/app/"
      className="group w-[40px] sm:w-[48px] cursor-pointer h-14 sm:h-16 bg-transparent flex flex-col justify-center items-center"
    >
      <span
        className={`D3-color w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] bg-lotion rounded-full inline-block transition ease-in-out delay-150 ${className}`}
      ></span>
      <span className="D3-color  w-full h-[6px] sm:h-2 bg-lotion inline-block mt-2"></span>
    </Link>
  );
};

export default Logo;
