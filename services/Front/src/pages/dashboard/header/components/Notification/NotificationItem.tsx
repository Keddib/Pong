import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const NotificationItem: FunctionComponent<{ action: () => void }> = (props) => {
  return (
    <Link
      className="rounded-xl bg-queenBlue flex flex-col p-4"
      to="/app/friends/requests"
      onClick={props.action}
    >
      <p>
        <strong>Keddib</strong> sent you a friend request
      </p>
    </Link>
  );
};

export default NotificationItem;
