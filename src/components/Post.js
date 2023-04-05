import React from "react";
import icon1 from "../images/post-icon1.svg";
import icon2 from "../images/post-icon2.svg";
import icon3 from "../images/post-icon3.svg";

export default function Tweet({ content, username, photoURL }) {
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
          <img alt="" src={icon1} />
          <img alt="" src={icon2} />
          <img alt="" src={icon3} />
        </div>
      </div>
    </div>
  );
}
