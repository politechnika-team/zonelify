import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/Home.css";

export default function CreatePost({ photoURL, currentUser }) {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    content: yup
      .string()
      .required("In order to drop in you need to write something!!!"),
    //TODO
    // dodać lajki dislajki fajwority

    //TODO
  });
  //resolver to useForm
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  //creating post reference

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    //getting current date and correct symbols
    const currentDate = new Date();
    const minutes =
      currentDate.getMinutes() < 10
        ? "0" + currentDate.getMinutes()
        : currentDate.getMinutes();

    const hours =
      currentDate.getHours() < 10
        ? "0" + currentDate.getHours()
        : currentDate.getHours();

    //adding doc to posts collection
    await addDoc(postsRef, {
      content: data.content,
      userId: user?.uid,
      username: user?.displayName,
      photoURL: currentUser?.photoURL,
      creationDate: currentDate
        .toISOString()
        .replace("T", " ")
        .substring(0, 10),
      creationHour: hours + ":" + minutes,
      creationTimestamp: currentDate.getTime(),
    });
  };

  return (
    <div className="dropin-container">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <div className="dropin-input">
          {/*Dorobic w stylach loading na avatary bo sie brzydko ladują - przechodzą z alta na default i dopiero  potem na user avatar*/}
          <img src={photoURL} alt="avatar" />
          <input
            type="text"
            placeholder="Write something!"
            {...register("content")}
          />
          <p style={{ color: "red" }}>{formState.errors.content?.message}</p>
        </div>
        <button
          className="dropin-btn"
          value="Drop in"
          disabled={
            !formState.isValid ||
            (formState.touchedFields.content && !formState.dirtyFields.content)
          }
        >
          Drop in
        </button>
      </form>
    </div>
  );
}
