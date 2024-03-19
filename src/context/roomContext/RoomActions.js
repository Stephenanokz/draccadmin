//CREATE ROOM
export const createRoomStart = () => ({
  type: "CREATE_ROOM_START",
});

export const createRoomSuccess = (room) => ({
  type: "CREATE_ROOM_SUCCESS",
  payload: room,
});

export const createRoomFailure = () => ({
  type: "CREATE_ROOM_FAILURE",
});

//GET ROOMS
export const getRoomsStart = () => ({
  type: "GET_ROOMS_START",
});

export const getRoomsSuccess = (rooms) => ({
  type: "GET_ROOMS_SUCCESS",
  payload: rooms,
});

export const getRoomsFailure = () => ({
  type: "GET_ROOMS_FAILURE",
});

//GET ONE ROOM
export const getRoomStart = () => ({
  type: "GET_ROOM_START",
});

export const getRoomSuccess = (room) => ({
  type: "GET_ROOM_SUCCESS",
  payload: room,
});

export const getRoomFailure = () => ({
  type: "GET_ROOM_FAILURE",
});

//UPDATE ROOM
export const updateRoomStart = () => ({
  type: "UPDATE_ROOM_START",
});

export const updateRoomSuccess = (room) => ({
  type: "UPDATE_ROOM_SUCCESS",
  payload: room,
});

export const updateRoomFailure = () => ({
  type: "UPDATE_ROOM_FAILURE",
});

//DELETE ROOM
export const deleteRoomStart = () => ({
  type: "DELETE_ROOM_START",
});

export const deleteRoomSuccess = (id) => ({
  type: "DELETE_ROOM_SUCCESS",
  payload: id,
});

export const deleteRoomFailure = () => ({
  type: "DELETE_ROOM_FAILURE",
});
