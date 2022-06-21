import { NavLink } from "react-router-dom";

const IconWrap = (props) => {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.


  return (
    // change to Link later
    <NavLink
      onClick={props.showNav}
      to={props.page}
      className="icon-wrapper group"
    >
      <div className="icon-line"></div>
      <div className="icon-div">
        {props.children}
      </div>
    </NavLink>
  );
};

export default IconWrap;
