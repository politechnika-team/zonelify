import { useState, useContext, useEffect } from "react";
import ReactDom from "react-dom";
import { AuthContext } from "../context/AuthContext";
import { db, upload } from "../firebase";
import { updateProfile } from "firebase/auth";
import "../css/EditProfile.css";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ open, onClose }) {
  const { currentUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const navigate = useNavigate();

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

      const usersRef = collection(db, "users");
      const userDoc = doc(usersRef, currentUser.uid);
      await updateDoc(userDoc, { displayName: nickname });

      // Update displayName in all posts for current user
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (postDocSnap) => {
        const postDoc = doc(postsRef, postDocSnap.id);
        await updateDoc(postDoc, { username: nickname });
      });
    }
    if (photo) {
      upload(photo, currentUser, setLoading);
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (postDocSnap) => {
        const postDoc = doc(postsRef, postDocSnap.id);
        const postData = postDocSnap.data();

        // TO DZIALA ALE DOPIERO ZA DRUGIM RAZEM JAK SIE ZUPLOADUJE NA NOWYM UZYTKOWNIKU AVATAR TO DODAJE NOWY AVATAR DLA JEGO POSTU
        if (
          postData.photoURL ===
          "https://firebasestorage.googleapis.com/v0/b/zonelifyv2.appspot.com/o/profile-default.jpg?alt=media&token=7ebfddc9-b58f-400c-83c4-09497b7ae683"
        ) {
          // Update the avatar property with the new URL
          await updateDoc(postDoc, { photoURL: currentUser.photoURL });
        }
      });
      //TODO
      //JAKIS FIX NA NOWYCH UZYTKOWNIKOW BO NIE UPDATUJE AVATARA JAK JEST DEFAULTOWY A PO ZMIANIE AVATARA
      // I DODANIU POSTU NORMALNIE UPDATUJE
      //TODO
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
