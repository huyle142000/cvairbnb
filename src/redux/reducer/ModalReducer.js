import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  ComponentContentModal: <p>1</p>,
};
export const ModalReducer = createSlice({
  name: "ModalReducer",
  initialState,
  reducers: {
    closeModal: (state, action) => {
      state.show = false;
    },
    openModal: (state, action) => {
      state.show = true;
      state.ComponentContentModal = action.payload;
    },
  },
});
//truyền action
export const { closeModal, openModal } = ModalReducer.actions;
export default ModalReducer.reducer;
