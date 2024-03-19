import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createServiceCall } from "../../context/serviceContext/ServiceApiCalls";
import { ServiceContext } from "../../context/serviceContext/ServiceContext";
import "./NewService.css";

const NewService = () => {
  const [service, setService] = useState(null);
  const { dispatch } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setService({
      ...service,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createServiceCall(service, dispatch);
    return navigate("/services");
  };

  return (
    <div className="newPost">
      <h1 className="addPostTitle">New Service</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
          <label>Service Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter service title"
            onChange={handleChange}
          />
          <label>Service Subtitle</label>
          <input
            name="subtitle"
            type="text"
            placeholder="Enter service subtitle"
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="desc"
            onChange={handleChange}
            placeholder="Service description"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button className="newPostButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};

export default NewService;
