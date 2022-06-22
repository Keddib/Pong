import { Link } from "react-router-dom";

export default function NotificationItem(props) {
  return (
    <Link
      className="rounded-xl bg-queenBlue flex flex-col p-4"
      to="/app/friends/requests"
      onClick={props.action}
    >
      <p><strong>Keddib</strong> sent you a friend request</p>
    </Link>
  );
}
