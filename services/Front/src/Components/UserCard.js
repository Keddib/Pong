import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link to={user.id} className="user-wrapper group">
      <div className="relative">
        <img alt="user" src={user.img} className="user-img" />
        <span className={user.statusColor}></span>
      </div>
      <div className="group-hover:text-lotion/70 ml-4">
        <h4>{user.name}</h4>
        <p>{user.status}</p>
      </div>
    </Link>
  );
}
