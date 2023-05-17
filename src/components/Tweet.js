import React from "react";
import icon1 from "../images/post-icon1.svg";
import icon2 from "../images/post-icon2.svg";
import icon3 from "../images/post-icon3.svg";

export default function Tweet() {
  return (
    <div className="post">
      <div className="post-avatar">
        <img alt="avatar" />
      </div>
      <div className="post-body">
        <div className="post-header">
          <div className="post-headerText">
            <h3>
              Daniel Urban
              <span className="post-headerSpecial"> @danielek1337</span>
            </h3>
          </div>
          <div className="post-headerDescription">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
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
