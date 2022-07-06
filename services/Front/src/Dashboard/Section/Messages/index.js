import { Link } from "react-router-dom";

export default function Messages() {
  return (
    <div>
      <h1>messages</h1>
      <div className="flex flex-col">
        <Link to="/" > home </Link>
        <Link to="/access/signin" > signin </Link>
        <Link to="/access/signup" > signup </Link>
        <Link to="/game" > game </Link>
      </div>
    </div>
  )
}
