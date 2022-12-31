import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkDateIn: "",
  checkDateOut: "",
  checkDateOutLimit: "",
  checkInRequest: "",
  checkOutRequest: "",
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
    getCheckInRequest: (state, action) => {
      state.checkInRequest = action.payload;
    },
    getCheckOutRequest: (state, action) => {
      state.checkOutRequest = action.payload;
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
  getCheckInRequest,
  getCheckOutRequest,
} = CalendarReducer.actions;
export default CalendarReducer.reducer;
