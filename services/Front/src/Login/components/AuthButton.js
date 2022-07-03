import I42 from "/src/assets/images/42.svg";

const AuthButton = (props) => {

  return (
    <>
      <button
        className={`button--42 ${props.action}`}
      >
        <I42 className="mr-2 !fill-crayola" />
        {`${props.action} with 42`}
      </button>
    </>
  );
}

export default AuthButton;
