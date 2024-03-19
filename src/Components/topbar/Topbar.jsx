import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            admin@dracc.org
          </span>
        </div>
        <div className="topRight">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/dracc-53c18.appspot.com/o/img%2FlogoLight.png?alt=media&token=54fe4f10-b18c-475e-a72c-ccdb362f4b7a"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
