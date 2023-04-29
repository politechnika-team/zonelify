import { React, useContext, useEffect, useState } from "react";
import EditProfile from "../components/EditProfile";
import Post from "../components/Post";
import { AuthContext } from "../context/AuthContext";
import "../css/Profile.css";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  // profile path
  const { displayName } = useParams();
  // profile path
  const [isOpen, setIsOpen] = useState(false);
  const [postsList, setPostsList] = useState(null);
  const postsRef = collection(db, "posts");
  const usersRef = collection(db, "users");
  const [userPhoto, setUserPhoto] = useState(null);
  const [description, setDescription] = useState(null);

  const q = query(postsRef, orderBy("creationTimestamp", "desc"));

  const getPosts = async () => {
    const data = await getDocs(q);
    setPostsList(
      data.docs
        .filter((doc) => doc.data().username === displayName)
        .map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const getUser = async (displayName) => {
    const userDoc = query(usersRef, where("displayName", "==", displayName));
    const data = await getDocs(userDoc);
    return data.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))[0];
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(displayName);
      setUserPhoto(user.photoURL);
      setDescription(user.description);
    };
    fetchUser();
  }, [displayName]);

  useEffect(() => {
    getPosts();
  }, [displayName]);

  const [photoURL, setPhotoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/zonelifyv2.appspot.com/o/profile-default.jpg?alt=media&token=7ebfddc9-b58f-400c-83c4-09497b7ae683"
  );

  useEffect(() => {
    if (currentUser?.photoURL) setPhotoURL(currentUser.photoURL);
  }, [currentUser]);

  return (
    <div className="pages-container">
      <div className="home-container">
        <div className="home-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-description-container">
          {/*Dorobic w stylach loading na avatary bo sie brzydko ladują - przechodzą z alta na default i dopiero  potem na user avatar*/}
          {/*TODO
             OSTYLOWAC OPIS 
            TODO*/}
          <div className="profile-image-description">
            <img
              className="profile-picture"
              src={userPhoto}
              alt="user profile"
            />
            <p>{description}</p>
          </div>
          <p>
            <b>@{displayName}</b>
          </p>
          {currentUser?.displayName === displayName && (
            <button className="edit-btn" onClick={() => setIsOpen(true)}>
              Edit Profile
            </button>
          )}
          {isOpen && (
            <EditProfile open={isOpen} onClose={() => setIsOpen(false)} />
          )}
        </div>
        <div className="post-container">
          {postsList?.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              creatorId={post.userId}
              content={post.content}
              username={post.username}
              photoURL={post.photoURL}
              currentUser={currentUser}
              creationDate={post.creationDate}
              creationHour={post.creationHour}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
