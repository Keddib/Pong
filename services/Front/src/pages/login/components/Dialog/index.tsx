import Logo from "components/Logo";
import { FunctionComponent } from "react";

type Title = {
  primary: string;
  secondary: string;
};

type Props = {
  title: Title;
  children: JSX.Element;
};

const Dialog: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <>
      <Logo className="group-hover:animate-bounce" />
      <h2>
        {title.primary} <strong className="strong">Pong</strong>
      </h2>
      <h5 className="capitalize">{title.secondary}</h5>
      {children}
    </>
  );
};

export default Dialog;
