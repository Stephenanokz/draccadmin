import React from "react";
import "./RoomList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RoomContext } from "../../context/roomContext/RoomContext";
import {
  deleteRoomCall,
  getRoomsCall,
} from "../../context/roomContext/RoomApiCalls";

const RoomList = () => {
  const { rooms, dispatch } = useContext(RoomContext);

  useEffect(() => {
    getRoomsCall(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    deleteRoomCall(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "room",
      headerName: "Room",
      width: 250,
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
    { field: "desc", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/room/" + params.row._id}>
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

  return !rooms.length > 0 ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="productList">
      <div className="postTitleContainer">
        <h1 className="postTitle">Our Rooms</h1>
        <Link to="/newRoom">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="table">
        <DataGrid
          rows={rooms}
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

export default RoomList;
