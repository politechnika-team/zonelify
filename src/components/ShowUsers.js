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
    <div className="userslist-container">
      <img src={photoURL} />
      <NavLink to={`/profile/${displayName}`}>
        <p>@{displayName}</p>
      </NavLink>
    </div>
  );
}
