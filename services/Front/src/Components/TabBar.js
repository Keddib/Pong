import { NavLink } from "react-router-dom";

export default function TabBar({ links }) {
  return (
    <nav className=" tabBar">
      <NavLink to={links.first.path} className="tabLink" >{links.first.name}</NavLink>
      <div className="tabLine"></div>
      <NavLink to={links.second.path} className="tabLink">{links.second.name}</NavLink>
      {
        links.third &&
        <>
          <div className="tabLine"></div>
          <NavLink to={links.third.path} className="tabLink">{links.third.name}</NavLink>
        </>
      }
    </nav>
  );
}
