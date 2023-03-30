import React from "react";
import Navbar from "../components/Navbar";
import Tweet from "../components/Tweet";

export default function MainSite({ photoURL, currentUser }) {
  return (
    <div className="mainsite-container">
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <h1>Home</h1>
        </div>
        <div className="dropin-container">
          <form>
            <div className="dropin-input">
              {/*Dorobic w stylach loading na avatary bo sie brzydko ladują - przechodzą z alta na default i dopiero  potem na user avatar*/}
              <img src={photoURL} alt="avatar" />
              <input type="text" placeholder="Write something!" />
            </div>
            <button className="dropin-btn" value="Drop in">
              Drop in
            </button>
          </form>
        </div>
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
