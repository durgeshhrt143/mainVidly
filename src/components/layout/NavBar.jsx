import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  console.log(user);
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to={`/movies`}>
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/customer`}>
            Customer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/rental`}>
            Rental
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/api`}>
            Api
          </NavLink>
        </li>
        {!user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/login`}>
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/user`}>
                Registration
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/profile`}>
                {user.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/logout`}>
                Logout
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
