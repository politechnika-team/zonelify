import { React, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { upload } from "../firebase";

export default function Profile({ currentUser }) {
  const [photoURL, setPhotoURL] = useState(
    "https://qqmodels.pl/profiles/profile-5238.jpg?16801769"
  );
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) setPhotoURL(currentUser.photoURL);
  }, [currentUser]);

  return (
    <div className="mainsite-container">
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <h1>Profile</h1>
        </div>
        <div className="dropin-container">
          {/*Dorobic w stylach loading na avatary bo sie brzydko ladują - przechodzą z alta na default i dopiero  potem na user avatar*/}
          <img className="profile-picture" src={photoURL} alt="user profile" />
          <label htmlFor="avatar">Upload your avatar: </label>
          <input
            type="file"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />

          <button
            className="dropin-btn"
            disabled={loading || !photo}
            onClick={handleClick}
          >
            Upload picture
          </button>
        </div>
        <div className="post-container">
          {/*tweet section printed from firebase */}
        </div>
      </div>
    </div>
  );
}
