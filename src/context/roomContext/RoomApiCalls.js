import axios from "axios";
import {
  createRoomFailure,
  createRoomStart,
  createRoomSuccess,
  deleteRoomFailure,
  deleteRoomStart,
  deleteRoomSuccess,
  getRoomsFailure,
  getRoomsStart,
  getRoomsSuccess,
  updateRoomStart,
  updateRoomSuccess,
  updateRoomFailure,
  getRoomStart,
  getRoomSuccess,
  getRoomFailure,
} from "./RoomActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getRoomsCall = async (dispatch) => {
  dispatch(getRoomsStart());
  try {
    const res = await axiosInstance.get("/rooms/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getRoomsSuccess(res.data));
  } catch (err) {
    dispatch(getRoomsFailure());
  }
};

export const getRoomCall = async (id, dispatch) => {
  dispatch(getRoomStart());
  try {
    const res = await axiosInstance.get(`/rooms/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const room = [];
    room.push(res.data);
    dispatch(getRoomSuccess(room));
  } catch (err) {
    dispatch(getRoomFailure());
  }
};

export const createRoomCall = async (room, dispatch) => {
  dispatch(createRoomStart());
  try {
    const res = await axiosInstance.post("/rooms/", room, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createRoomSuccess(res.data));
  } catch (err) {
    dispatch(createRoomFailure());
  }
};

export const updateRoomCall = async (room, dispatch) => {
  dispatch(updateRoomStart());
  try {
    const res = await axiosInstance.put("/rooms/" + room._id, room, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updateRoomSuccess(res.data));
  } catch (err) {
    dispatch(updateRoomFailure());
  }
};

export const deleteRoomCall = async (id, dispatch) => {
  dispatch(deleteRoomStart());
  try {
    await axiosInstance.delete("/rooms/" + id, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deleteRoomSuccess(id));
  } catch (err) {
    dispatch(deleteRoomFailure());
  }
};
