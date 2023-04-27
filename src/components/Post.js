import React, { useEffect, useState } from "react";
import icon1 from "../images/post-icon1.svg";
import icon2 from "../images/post-icon2.svg";
import icon3 from "../images/post-icon3.svg";
import trashIcon from "../images/trash.png";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import DeletePost from "./DeletePost";

export default function Post({
  content,
  username,
  photoURL,
  currentUser,
  postId,
  creatorId,
  creationDate,
  creationHour,
}) {
  //POST DELETE SECTION
  const [isOpen, setIsOpen] = useState(false);
  //POST DELETE SECTION

  const [likes, setLikes] = useState(null);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", postId));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  //REMOVING LIKE FUNCTION
  const removeLike = async (data) => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", postId),
        where("userId", "==", currentUser.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (currentUser) {
        setLikes(
          (prev) =>
            prev && prev?.filter((like) => like.userId !== currentUser.uid)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  //ADDING LIKE FUNCTION
  const addLike = async (data) => {
    try {
      await addDoc(likesRef, {
        userId: currentUser?.uid,
        postId: postId,
      });
      //RERENDERING COMPONENT ON USER LIKE CLICK TO SHOW THE COUNTER CHANGE
      if (currentUser) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: currentUser?.uid }]
            : [{ userId: currentUser?.uid }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", postId));
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === currentUser?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post">
      <div className="post-avatar">
        <img alt="avatar" src={photoURL} />
      </div>
      <div className="post-body">
        <div className="post-header">
          <div className="post-headerText">
            <h3>
              {/*tutaj albo dodajemy mozliwosc dodania nazwy pełnej profilu albo nie */}
              <span className="post-headerSpecial"> @{username}</span>
            </h3>
          </div>
          <div className="post-headerDescription">
            <p>{content}</p>
          </div>
        </div>
        <div className="post-footer">
          {/*TODO*/}
          {/*pozmieniac svg na buttony albo obrazki bo trzeba zmienic na thumbsdown albo dislike jednak jak już raz polajkowal */}
          {/*TODO*/}
          <img alt="" src={icon1} />
          <img
            alt=""
            src={icon2}
            onClick={hasUserLiked ? removeLike : addLike}
          />
          {/*tutaj zmienic to na nowy obrazek albo cos*/}
          {hasUserLiked ? "polajkowane" : "niepolajkowane"}
          {likes?.length && <p>{likes?.length}</p>}
          <img alt="" src={icon3} />
        </div>
      </div>
      {currentUser.uid === creatorId ? (
        <img
          className="trash-icon"
          alt="Delete Post"
          src={trashIcon}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        ""
      )}
      {isOpen && (
        <DeletePost
          open={isOpen}
          onClose={() => setIsOpen(false)}
          handleDelete={handleDelete}
        />
      )}
      <p className="date-paragraph">{creationHour + " " + creationDate}</p>
    </div>
  );
}
