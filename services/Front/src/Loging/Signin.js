import Logo from "../Components/Logo"
import Form from "./components/Form"
import Button from "../Components/Button"
import LOGO42 from "../../public/assets/images/42.svg"

import { Link } from "react-router-dom"



const Singin = () => {
  return (
    <div className="signin">
      <Logo className="group-hover:animate-bounce" />
      <h2 className="my-4">welcome to <h1 className="inline-block ">pong</h1></h2>
      <h5 className="capitalize mb-10">Welcome back! Please enter your details.</h5>
      <Form className={"mb-8"} />
      <Button text="Sign in with intra42" className="button42" >
        <LOGO42 className="fill-spaceCadet" />
      </Button>
      <p className="text-spaceCadet mt-3" >
        Don’t have an account?
        <Link to="/signup" className="text-pictonBlue/70 cursor-pointer hover:text-pictonBlue">
          Sign up fo free!
        </Link>
      </p>
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
