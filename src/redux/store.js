import { configureStore } from "@reduxjs/toolkit";
import BookTravel from "./reducer/BookTravel";
import CalendarReducer from "./reducer/CalendarReducer";
import CommentReducer from "./reducer/CommentReducer";
import FormReducer from "./reducer/FormReducer";
import LocationRoomReducer from "./reducer/LocationRoomReducer";
import ModalReducer from "./reducer/ModalReducer";
import UserManagerReducer from "./reducer/UserManagerReducer";
import LoadingSpinner from "./reducer/Loading";

export const store = configureStore({
  reducer: {
    UserManagerReducer,
    LocationRoomReducer,
    ModalReducer,
    FormReducer,
    CalendarReducer,
    CommentReducer,
    BookTravel,
    LoadingSpinner,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
