import React from "react";
import "../css/DisplayNote.css";
export default function DisplayNote({
  title,
  content,
  getId,
  id,
  getUpdatedNoteId,
}) {
  return (
    <div className="note-container">
      <div className="note">
        <h2 className="title">{title}</h2>
        <p className="content">{content}</p>
      </div>
      <button onClick={() => getId(id)}>Delete</button>
      <button onClick={() => getUpdatedNoteId({ content, title, id })}>
        Update note
      </button>
    </div>
  );
}
