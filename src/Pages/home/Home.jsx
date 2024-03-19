import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <img src="https://firebasestorage.googleapis.com/v0/b/dracc-53c18.appspot.com/o/img%2FlogoDark.png?alt=media&token=6c7ce575-ed2b-48dd-a171-bbaafa828bff" className="homeImg" alt="logo" />
      <h1 className="homeTitle">
        Welcome back, {JSON.parse(localStorage.getItem("user")).username}.
      </h1>
      <span className="homeSubTitle">
        To create and edit any Module, please use the appropriate tab on the Sidebar
      </span>
    </div>
  );
};

export default Home;
