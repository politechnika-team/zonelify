import React from "react";
import { useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";
import logo from "../images/site-logo.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const handleLogOut = () => {
    signOut(auth);
  };

  const location = useLocation();

  return (
    <nav>
      <NavLink exact to="/" activeClassName="active">
        <img src={logo} alt="eloo" />
      </NavLink>
      <div className="nav-buttons">
        <NavLink to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/messages" activeClassName="active">
          Messages
        </NavLink>
        <NavLink to="/notes" activeClassName="active">
          Notes
        </NavLink>
        <NavLink to="/daily" activeClassName="active">
          Daily
        </NavLink>
        <NavLink to="/profile" activeClassName="active">
          Profile
        </NavLink>
      </div>
      <div className="nav-logout">
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </nav>
  );
}
