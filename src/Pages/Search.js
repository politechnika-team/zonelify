import React, { useState } from "react";
import "../css/Search.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ShowUsers from "../components/ShowUsers";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const userRef = collection(db, "users");

  const getUsers = async (searchText) => {
    setLoading(true);
    const userDoc = query(userRef, where("displayName", ">=", searchText));
    const data = await getDocs(userDoc);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
    setLoading(false);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value.trim();
    setSearchText(searchText);
    console.log(searchText.length);
    if (searchText.length === 0) {
      setUsers([]);
    } else {
    }
  };

  return (
    <div className="pages-container">
      <div className="home-container">
        <div className="home-header">
          <h1>Search for users</h1>
        </div>
        <div className="search-container">
          <input
            placeholder="Type in user nickname"
            type="text"
            name="search"
            onChange={handleSearch}
          ></input>
          <button
            disabled={searchText === ""}
            onClick={() => getUsers(searchText)}
          >
            Search
          </button>
        </div>
        <div className="users-container">
          {/* Render a loading indicator if the data is still loading */}
          {loading ? (
            <span className="material-symbols-outlined">sync</span>
          ) : (
            users.map((user, index) => (
              <ShowUsers
                key={index}
                displayName={user.displayName}
                email={user.email}
                searchText={searchText}
                photoURL={user.photoURL}
                description={user.description}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
