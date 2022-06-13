import Logo from "../Components/Logo"
import Button from "../Components/Button"
import LOGO42 from "../../public/assets/images/42.svg"

import PlayerImg from "../../public/assets/images/signup.png"

const Singin = () => {
  return (
    <div className="w-full h-full bg-spaceCadet text-lotion">
      <div className=" h-full  xl:flex">

        <div className="w-full h-full p-2 flex justify-center items-center xl:w-1/2">
          <div className="">
            <Logo className="group-hover:animate-bounce" />
            <h2 className="my-4">Join us today <h1 className="inline-block ">pong</h1></h2>
            <h5 className="capitalize mb-10">Enjoy Playing with your friends.</h5>
            {/* <Form className={"mb-10"} /> */}
            <Button text="Sign up with intra42" className="button42" >
              <LOGO42 className="fill-spaceCadet" />
            </Button>
            <p className=" mt-3" >Do you have an account?<span className="text-pictonBlue/70 cursor-pointer hover:text-pictonBlue">Sign in</span></p>
          </div>
        </div>
        <div className="hidden xl:flex w-1/2 h-full justify-center items-center background-singin2">
          <img className="rounded-2xl" alt="player img" src={PlayerImg} />
        </div>

      </div>
    </div>
  );
};

export default Singin;
