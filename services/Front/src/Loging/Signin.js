import Logo from "../Components/Logo"
import Form from "./components/Form"
import Button from "../Components/Button"
import LOGO42 from "../../public/assets/images/42.svg"

import PlayerImg from "../../public/assets/images/signin.png"

const Singin = () => {
  return (
    <div className="w-full h-full bg-lotion text-spaceCadet">
      <div className=" h-full  xl:flex">

        <div className="w-full h-full p-2 flex justify-center items-center xl:w-1/2">
          <div className="">
            <Logo className="group-hover:animate-bounce" />
            <h2 className="my-4">welcome to <h1 className="inline-block ">pong</h1></h2>
            <h5 className="capitalize mb-10">Welcome back! Please enter your details.</h5>
            <Form className={"mb-10"} />
            <Button text="Sign up with intra42" className="button42" >
              <LOGO42 className="fill-spaceCadet" />
            </Button>
          </div>
        </div>
        <div className="hidden xl:flex w-1/2 h-full justify-center items-center background-singin">
          <img className="rounded-2xl" alt="player img" src={PlayerImg} />
        </div>

      </div>
    </div>
  );
};

export default Singin;

/* <div>
  <h1>h1 title font in all devices </h1>
  <h2>h2 title font in all devices </h2>
  <h3>h3 title font in all devices </h3>
  <h4>h4 title font in all devices </h4>
  <h5>h5 title font in all devices </h5>
  <p>
    paragraph test paragraph test paragraph test paragraph test paragraph
    test paragraph test paragraph test
  </p>
</div> */
