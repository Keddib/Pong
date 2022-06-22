import Logo from "/src/Components/Logo";
const Dialog = (props) => {

  return (
    <>
      <Logo className="group-hover:animate-bounce" />
      <h2>
        {props.title.primary} <strong className="strong">Pong</strong>
      </h2>
      <h5 className="capitalize">
        {props.title.secondary}
      </h5>
      {props.children}
    </>
  );
}

export default Dialog;
