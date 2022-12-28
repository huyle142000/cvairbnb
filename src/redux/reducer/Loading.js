import { createSlice } from "@reduxjs/toolkit";
import { wait } from "@testing-library/user-event/dist/utils";

const initialState = {
  show: false,
};
export const LoadingSpinner = createSlice({
  name: "LoadingSpinner",
  initialState,
  reducers: {
    closeSpinner: (state, action) => {
      state.show = false;
    },
    openSpinner: (state, action) => {
        state.show = true;
        wait(500)
    },
  },
});
//truyền action
export const { closeSpinner, openSpinner } = LoadingSpinner.actions;
export default LoadingSpinner.reducer;
