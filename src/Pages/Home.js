import React from "react";
import Navbar from "../components/Navbar";
import Tweet from "../components/Tweet";
import CreatePost from "../components/CreatePost";

export default function MainSite({ photoURL, currentUser }) {
  return (
    <div className="mainsite-container">
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <h1>Home</h1>
        </div>
        <CreatePost photoURL={photoURL} currentUser={currentUser} />
        <div className="post-container">
          {/*tweet section printed from firebase */}
          <Tweet />
          <Tweet />
          <Tweet />
        </div>
      </div>
    </div>
  );
}
