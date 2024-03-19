import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createRoomCall } from "../../context/roomContext/RoomApiCalls";
import { RoomContext } from "../../context/roomContext/RoomContext";
import "./NewRoom.css";

const NewRoom = () => {
  const [room, setRoom] = useState(null);
  const { dispatch } = useContext(RoomContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setRoom({
      ...room,
      [e.target.name]: value,
    });
  };

  const handleSelect = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRoomCall(room, dispatch);
    return navigate("/rooms");
  };

  return (
    <div className="newPost">
      <h1 className="addPostTitle">New Room</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
          <label>Room Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter room title here"
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="desc"
            onChange={handleChange}
            placeholder="Enter room description"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <label>Room Price</label>
          <input
            type="number"
            placeholder="Enter room price"
            name="price"
            onChange={handleChange}
          />
        </div>
        <button className="newPostButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewRoom;
