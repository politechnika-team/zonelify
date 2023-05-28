import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/Notes.css";
import DisplayNote from "../components/DisplayNote";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase";

export default function Notes() {
  const { currentUser, darkMode } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [id, setId] = useState("");
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const currentDate = new Date();
  const noteRef = collection(db, "notes");

  // FETCHING NOTES DATA FOR LOGGED IN USER
  const getNotes = async () => {
    const notesToQuery = query(noteRef, where("userId", "==", currentUser.uid));
    const data = await getDocs(notesToQuery);
    setNotes(
      data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => b.creationTimestamp - a.creationTimestamp)
    );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddNote({
      ...addNote,
      [name]: value,
      userId: currentUser.uid,
      creationTimestamp: currentDate.getTime(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      // Updating existing note
      const noteToUpdate = doc(noteRef, id);
      await updateDoc(noteToUpdate, addNote);
    } else {
      // Adding new note
      await addDoc(noteRef, addNote);
    }

    // Clear the form fields and fetch updated notes
    setAddNote({
      title: "",
      content: "",
      userId: currentUser.uid,
      creationTimestamp: currentDate.getTime(),
    });
    setId("");
    getNotes();
  };

  const deleteNote = async (id) => {
    const delelenote = doc(noteRef, id);
    await deleteDoc(delelenote);
    getNotes();
  };

  //setting the form content to  the note content
  const updateNote = async (note) => {
    setAddNote({ title: note.title, content: note.content });
    setId(note.id);
    setShowUpdateButton(true);
  };

  //updating the note with new content
  const updatedNote = async (id) => {
    const updatenote = doc(noteRef, id);
    await updateDoc(updatenote, {
      ...addNote,
      title: addNote.title,
      content: addNote.content,
    });
    setShowUpdateButton(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="pages-container">
      <div
        className={`home-container ${darkMode ? "dark-mode" : "light-mode"}`}
      >
        <div className="home-header">
          <h1>Write down your notes</h1>
        </div>
        <form
          method="post"
          className="notes-form-container"
          onSubmit={handleSubmit}
        >
          <input
            className="title-input"
            type="text"
            name="title"
            placeholder="Enter note title..."
            value={addNote.title}
            onChange={handleChange}
          ></input>
          <textarea
            className="content-input"
            type="textarea"
            name="content"
            rows="4"
            cols="50"
            value={addNote.content}
            placeholder="Type content here..."
            onChange={handleChange}
          ></textarea>
          <div className="notes-btn-container">
            {" "}
            <button className="addnote-btn">Add note</button>
            {showUpdateButton ? (
              <button className="update-btn" onClick={() => updatedNote(id)}>
                Update note
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
        <div>
          {notes &&
            notes.map((note, index) => (
              <DisplayNote
                key={index}
                title={note.title}
                content={note.content}
                id={note.id}
                getId={deleteNote}
                getUpdatedNoteId={updateNote}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
