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
    <div className="note">
      <h2 className="note-title">{title}</h2>
      <p className="note-content">{content}</p>

      <div className="note-buttons">
        <button onClick={() => getId(id)}>Delete note</button>
        <button onClick={() => getUpdatedNoteId({ content, title, id })}>
          Update note
        </button>
      </div>
    </div>
  );
}
