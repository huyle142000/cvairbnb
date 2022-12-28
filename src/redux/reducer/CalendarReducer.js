import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkDateIn: "",
  checkDateOut: "",
  checkDateOutLimit: "",

  arrCheckDateBefore: [],
  arrCheckDateIsBooked: [],
};
export const CalendarReducer = createSlice({
  name: "CalendarReducer",
  initialState,
  reducers: {
    getCheckIn: (state, action) => {
      state.checkDateIn = action.payload;
    },
    getCheckOut: (state, action) => {
      state.checkDateOut = action.payload;
    },
    getLimitCheckOut: (state, action) => {
      state.checkDateOutLimit = action.payload;
    },
    getCheckDateBefore: (state, action) => {
      state.arrCheckDateBefore = action.payload;
    },
    getDateIsBooked: (state, action) => {
      state.arrCheckDateIsBooked = action.payload;
    },
  },
});
//truyền action
export const {
  getLimitCheckOut,
  getCheckIn,
  getCheckOut,
  getCheckDateBefore,
  getDateIsBooked,
} = CalendarReducer.actions;
export default CalendarReducer.reducer;
