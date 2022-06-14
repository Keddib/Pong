import Logo from "../Components/Logo"
import Button from "../Components/Button"
import LOGO42 from "../../public/assets/images/42.svg"
import Input from "../Components/Input";
import { InputPhoto } from "../Components/Input"
import { Link } from "react-router-dom"

function Auth() {

  return (
    <div>
      <div className="mb-10 mt-4">
        <h2 className="my-4">Join us today <h1 className="inline-block ">pong</h1></h2>
        <h5 className="capitalize mb-10">Enjoy Playing with your friends.</h5>
      </div>
      <Button text="Sign up with intra42" className="button42" >
        <LOGO42 className="fill-spaceCadet" />
      </Button>
      <p className=" mt-3" >Do you have an account?<Link to="/signin" className="text-pictonBlue/70 cursor-pointer hover:text-pictonBlue">Sign in</Link> </p>
    </div>
  );
}

function CreateAccount() {
  return (
    <div>
      <div className="mb-10 mt-4">
        <h2 className="my-4">Create your account</h2>
        <h5 className="capitalize mb-10">Enter nickname and password.</h5>
      </div>
      <InputPhoto />
      <Input id="username" type="text" />
      <Input id="password" type="password" />
      <Button text="Continue" className="bg-pictonBlue text-lotion hover:bg-spaceCadet hover:border-spaceCadet border-2 border-pictonBlue" />
    </div>
  );
}

const Signup = ({ state }) => {
  return (
    <div className="">
      <Logo className="group-hover:animate-bounce" />
      {state == 1 ? Auth() : CreateAccount()}
    </div>
  );
};

export default Signup;
