import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/site-logo.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="eloo" />
      </Link>
      <div className="nav-buttons">
        <Link to="/">Home</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/daily">Daily</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="nav-logout">
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </nav>
  );
}
