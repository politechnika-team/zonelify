import { useState, useContext, useEffect } from "react";
import ReactDom from "react-dom";
import { AuthContext } from "../context/AuthContext";
import { db, upload } from "../firebase";
import { updateProfile } from "firebase/auth";
import "../css/EditProfile.css";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";

export default function EditProfile({ open, children, onClose }) {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  async function handleClick() {
    if (nickname) {
      await updateProfile(currentUser, {
        displayName: nickname,
      });
    }
    if (photo) {
      upload(photo, currentUser, setLoading);
    }
    if (userDescription && userDescription.length <= 100) {
      const usersRef = collection(db, "users");
      const userDoc = doc(usersRef, currentUser.uid);
      await updateDoc(userDoc, { description: userDescription });
    }

    //TODO
    //DODAC CZYSZCZENIE INPUTOW ORAZ REFRESH STRONY PO UPLOADZIE DANYCH
    //TODO
  }

  //USEEFFECT FOR CSS ANIMATION
  useEffect(() => {
    setShowEditProfile(true);
  }, []);
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" />
      <div className="modal-container">
        <div className="edit-profile-container">
          <button className="edit-btn" onClick={onClose}>
            Exit
          </button>
          <label htmlFor="avatar" className="custom-upload-button">
            Upload your avatar:{" "}
          </label>
          <input
            type="file"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={handleChange}
          />
          <label htmlFor="nickname">New nickname </label>
          <input
            name="nickname"
            onChange={(e) => setNickname(e.target.value)}
          ></input>
          <label htmlFor="nickname">Description</label>
          <input
            name="description"
            type="text"
            onChange={(e) => setUserDescription(e.target.value)}
          ></input>
          <button className="edit-btn" onClick={handleClick}>
            Update profile
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
