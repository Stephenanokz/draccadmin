import React from "react";
import "./ServiceList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ServiceContext } from "../../context/serviceContext/ServiceContext";
import {
  deleteServiceCall,
  getServicesCall,
} from "../../context/serviceContext/ServiceApiCalls";

const ServiceList = () => {
  const { services, dispatch } = useContext(ServiceContext);

  useEffect(() => {
    getServicesCall(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteServiceCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "service",
      headerName: "Service",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListProduct">
            <img
              src={
                params.row.img ||
                "https://payload.cargocollective.com/1/24/788943/14047332/cyan_255.png"
              }
              alt=""
              className="productListImage"
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "subtitle", headerName: "Subtitle", width: 150 },
    { field: "desc", headerName: "Description", width: 300 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/service/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => deleteHandler(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return !services.length > 0 ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="productList">
      <div className="postTitleContainer">
        <h1 className="postTitle">Our Services</h1>
        <Link to="/newService">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="table">
        <DataGrid
          rows={services}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(r) => r._id}
        />
      </div>
    </div>
  );
};

export default ServiceList;
