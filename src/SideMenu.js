import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/site-logo.svg";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./css/SideMenu.css"

const SideMenu = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <>
      <nav className="sidemenu">
        <NavLink to="/">
          <img src={logo} alt="eloo" />
        </NavLink>
        <div className="nav-buttons">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/daily">Daily</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </div>
        <button onClick={handleLogOut} className="logout-btn">
          Log Out
        </button>
      </nav>
    </>
  );
};

export default SideMenu;
