import React, { useEffect, useState, useMemo } from "react";
import "../css/Search.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import ShowUsers from "../components/ShowUsers";
import debounce from "lodash/debounce";

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

  // Debounce the search input to avoid unnecessary API calls
  const debouncedGetUsers = useMemo(
    () => debounce((searchText) => getUsers(searchText), 500),
    []
  );

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    if (searchText === "") {
      setUsers([]);
    } else {
      debouncedGetUsers(searchText.trim());
    }
  };

  useEffect(() => {
    return () => {
      // Cancel the debounced function when the component unmounts
      debouncedGetUsers.cancel();
    };
  }, [debouncedGetUsers]);

  return (
    <div className="pages-container">
      <div className="home-container">
        <div className="home-header">
          <h1>Search for users</h1>
        </div>
        <div className="search-container">
          <label htmlFor="search">Type in user nickname</label>
          <input type="text" name="search" onChange={handleSearch}></input>
          <button onClick={() => getUsers(searchText)}>Search</button>
        </div>
        <div className="post-container">
          {/* Render a loading indicator if the data is still loading */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            users.map((user, index) => (
              <ShowUsers
                key={index}
                displayName={user.displayName}
                email={user.email}
                searchText={searchText}
                photoURL={user.photoURL}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
