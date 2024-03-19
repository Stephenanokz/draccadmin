import RoomReducer from "./RoomReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  rooms: [],
  isFetching: false,
  error: false,
};

export const RoomContext = createContext(INITIAL_STATE);

export const RoomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RoomReducer, INITIAL_STATE);

  return (
    <RoomContext.Provider
      value={{
        rooms: state.rooms,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};