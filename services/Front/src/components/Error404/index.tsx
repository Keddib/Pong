import img404 from "assets/images/404.png";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="w-full h-full rounded-3xl bg-lotion flex justify-center items-center overflow-auto no-scrollbar">
      <div className="w-fit m-auto flex flex-col gap-4 items-center text-spaceCadet">
        <h1 className=" capitalize font-semiBold">Oops</h1>
        <h2 className="text-xl sm:text-2xl md:text-4xl font-poppins font-light normal-case">
          Something went wrong
        </h2>
        <p className="normal-case">Error 404 page not found</p>
        <img
          alt="error 404"
          src={img404}
          className="w-full max-w-[500px] my-6"
        />
        <Link to="/home" className="button--1 w-full max-w-[200px] text-center">
          go back home
        </Link>
      </div>
    </div>
  );
}
