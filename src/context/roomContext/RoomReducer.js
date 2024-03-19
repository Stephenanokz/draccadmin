const RoomReducer = (state, action) => {
  switch (action.type) {
    case "GET_ROOMS_START":
      return {
        rooms: [],
        isFetching: true,
        error: false,
      };
    case "GET_ROOMS_SUCCESS":
      return {
        rooms: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ROOMS_FAILURE":
      return {
        rooms: [],
        isFetching: false,
        error: true,
      };
    case "GET_ROOM_START":
      return {
        rooms: [],
        isFetching: true,
        error: false,
      };
    case "GET_ROOM_SUCCESS":
      return {
        rooms: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ROOM_FAILURE":
      return {
        rooms: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_ROOM_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_ROOM_SUCCESS":
      return {
        rooms: state.rooms.filter((room) => room._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_ROOM_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_ROOM_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_ROOM_SUCCESS":
      return {
        rooms: [...state.rooms, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_ROOM_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_ROOM_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_ROOM_SUCCESS":
      return {
        rooms: state.rooms.map(
          (room) => room._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_ROOM_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default RoomReducer;