import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { upload } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "../css/Profile.css";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);

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


  useEffect(() => {
    if (currentUser?.photoURL) setPhotoURL(currentUser.photoURL);
  }, [currentUser]);

  return (
<<<<<<< HEAD
    <div className="mainsite-container pages-container">
=======
    <div className="pages-container">
>>>>>>> d6ccc847dff4bbf93f864837703bc931d28d4537
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
