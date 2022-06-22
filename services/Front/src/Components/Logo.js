import { Link } from "react-router-dom";

export default function Logo({ className }) {
  return (
    <Link to="/app/" className="group w-[48px] cursor-pointer h-16 bg-transparent flex flex-col justify-center items-center">
      <span
        className={`D3-color w-[40px] h-[40px] bg-lotion rounded-full inline-block transition ease-in-out delay-150 ${className}`}
      ></span>
      <span className="D3-color  w-full h-2 bg-lotion inline-block mt-2"></span>
    </Link>
  );
}
