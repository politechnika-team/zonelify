import React, { useEffect, useState } from "react";
import "../css/Search.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ShowUsers from "../components/ShowUsers";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const userRef = collection(db, "users");

  const getUsers = async () => {
    const userDoc = query(userRef);
    const data = await getDocs(userDoc);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
  };

  const showUsers = () => {
    getUsers();
  };

  //clearing the setUsers component on empty input
  useEffect(() => {
    if (searchText == "") setUsers([]);
  }, [searchText]);

  return (
    <div className="pages-container">
      <div className="home-container">
        <div className="home-header">
          <h1>Search for users</h1>
        </div>
        <div className="search-container">
          <label htmlFor="search">Type in user nickname</label>
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button onClick={showUsers}>Search</button>
        </div>
        <div className="post-container">
          {/*users section printed from firebase */}
          {users.map((user, index) => (
            <ShowUsers
              key={index}
              displayName={user.displayName}
              email={user.email}
              searchText={searchText}
              photoURL={user.photoURL}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
