import { NavLink } from "react-router-dom";
import { Links } from "~/src/types";

type Props = {
  links: Links;
};

const TabBar = ({ links }: Props) => {
  return (
    <nav className=" tabBar py-2">
      <NavLink to={links.first.path} className="tabLink">
        {links.first.name}
      </NavLink>
      <div className="tabLine"></div>
      <NavLink to={links.second.path} className="tabLink">
        {links.second.name}
      </NavLink>
      {links.third && (
        <>
          <div className="tabLine"></div>
          <NavLink to={links.third.path} className="tabLink">
            {links.third.name}
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default TabBar;
