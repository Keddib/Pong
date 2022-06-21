import PlayerImgIn from "/src/assets/images/signin.png";
import PlayerImgUp from "/src/assets/images/signup.png";

const LoginImage = (props) => {

  return (
    <div className={`${props.isSignin ? "img-w-signin" : "img-w-signup"}`}>
      <img className="rounded-2xl" alt="player img" src={props.isSignin ? PlayerImgIn : PlayerImgUp} />
    </div>
  );
}


export default LoginImage;
