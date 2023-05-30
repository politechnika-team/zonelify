// import React from "react";
// import { useContext } from "react";
// import { useLocation, NavLink } from "react-router-dom";
// import logo from "../images/site-logo.svg";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { currentUser } = useContext(AuthContext);
//   const handleLogOut = () => {
//     signOut(auth);
//   };

//   const location = useLocation();

//   return (
//     <nav>
//       <NavLink to="/">
//         <img src={logo} alt="eloo" />
//       </NavLink>
//       <div className="nav-buttons">
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/messages">Messages</NavLink>
//         <NavLink to="/notes">Notes</NavLink>
//         <NavLink to="/daily">Daily</NavLink>
//         <NavLink to="/profile">Profile</NavLink>
//       </div>
//         <button onClick={handleLogOut} className="logout-btn">Log Out</button>
//     </nav>
//   );
// }
