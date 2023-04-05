import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { upload } from "../firebase";

export default function Profile({ currentUser }) {
  const [photoURL, setPhotoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/zonelifyv2.appspot.com/o/profile-default.jpg?alt=media&token=7ebfddc9-b58f-400c-83c4-09497b7ae683"
  );
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  async function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  console.log(currentUser.displayName);

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
          <label htmlFor="avatar" className="custom-upload-button">
            Upload your avatar:{" "}
          </label>
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
