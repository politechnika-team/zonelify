import React from "react";
import "../css/ShowUsers.css";
import { NavLink } from "react-router-dom";

export default function ShowUsers({
  displayName,
  description,
  email,
  searchText,
  photoURL,
}) {
  if (!displayName.includes(searchText) && searchText !== "") return null;
  return (
    <div className="users-container">
      <img src={photoURL} />
      <p>{displayName}</p>
      <NavLink to={`/profile/${displayName}`}>pozdro</NavLink>
      {description}
      {email}
    </div>
  );
}
