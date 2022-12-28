import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrListComment: [],
  starComment: {},
  inforUserComment: "",
};
export const CommentReducer = createSlice({
  name: "CommentReducer",
  initialState,
  reducers: {
    getCommentList: (state, action) => {
      state.arrListComment = action.payload;
    },
    getStarComment: (state, action) => {
      state.starComment = action.payload;
    },
    getUserComment: (state, action) => {
      state.inforUserComment = action.payload;
    },
  },
});
//truyền action
export const { getCommentList, getStarComment, getUsetComment } =
  CommentReducer.actions;
export default CommentReducer.reducer;
