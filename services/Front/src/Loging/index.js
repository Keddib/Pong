// import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlayerImg from "../../public/assets/images/signin.png"
import PlayerImg2 from "../../public/assets/images/signup.png"
import Signin from "./Signin";
import Signup from "./Signup"


const Login = ({ stage }) => {
  const signinStage = stage;
  console.log(stage);
  console.log(signinStage);
  console.log(signinStage ? "one" : 'two');
  return (
    <div className={`w-full h-full overflow-scroll ${signinStage ? "text-spaceCadet bg-lotion" : "text-lotion bg-spaceCadet"}`}>
      <div className=" h-full w-full xl:flex">
        <div className="w-full h-full p-2 flex justify-center items-center xl:w-1/2">
          {/* include sign up or sign in conditionaly */
            signinStage ? <Signin /> : <Signup />
          }
        </div>
        <div className={`hidden h-full overflow-hidden xl:flex w-1/2 justify-center items-center ${signinStage ? "background-singin" : "background-singup"} `}>
          <img className="rounded-2xl" alt="player img" src={signinStage ? PlayerImg : PlayerImg2} />
        </div>

      </div>
    </div>
  );
};

export default Login;
