import React from "react";
import logo from "../images/site-logo.svg";

export default function Navbar() {
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
        <button>Log out</button>
      </div>
    </nav>
  );
}
