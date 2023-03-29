import React from "react";
import { useContext } from "react";
import logo from "../images/site-logo.svg";
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const {currentUser} = useContext(AuthContext)
  const handleLogOut = () => {
    signOut(auth)
  }
  return (
    <nav>
      <a href="">
        <img src={logo} alt="eloo" />
      </a>
      <div className="nav-buttons">
        <a>Home</a>
        <a>Massages</a>
        <a>Notes</a>
        <a>Daily</a>
        <a>Profile</a>
      </div>
      <div className="nav-logout">
      <button onClick={handleLogOut}>logout</button>
      </div>
    </nav>
  );
}
