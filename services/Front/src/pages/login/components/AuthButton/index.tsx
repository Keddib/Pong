import I42 from "assets/icons/42.svg";
import { FunctionComponent } from "react";

type Props = {
  action: string;
};

const AuthButton: FunctionComponent<Props> = (props) => {
  return (
    <>
      <button className={`button--42 ${props.action}`}>
        <I42 className="mr-2 !fill-crayola" />
        {`${props.action} with 42`}
      </button>
    </>
  );
};

export default AuthButton;
