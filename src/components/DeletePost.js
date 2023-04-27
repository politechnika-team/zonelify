import React from "react";
import ReactDom from "react-dom";
import "../css/DeletePost.css";

export default function DeletePost({ open, onClose, handleDelete }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="overlay-styles" />
      <div className="modal-container">
        <p>Do you really want to delete this post?</p>
        <div className="btn-flex">
          <button className="delete-btn" onClick={handleDelete}>
            Yes
          </button>
          <button className="delete-btn" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </>,

    document.getElementById("portal")
  );
}
