import { token, USER_LOGIN } from "../../utils/setting";
import { createSlice } from "@reduxjs/toolkit";

let uLogin = "";

if (localStorage.getItem(USER_LOGIN)) {
  uLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  uLogin: uLogin,
};
export const FormReducer = createSlice({
  name: "FormReducer",
  initialState,
  reducers: {
    loginForm: (state, action) => {
      state.uLogin = action.payload;
    },
    logoutForm: (state, action) => {
      localStorage.removeItem(token);
      localStorage.removeItem(USER_LOGIN);
      state.uLogin = "";
      let navigate = action.payload;
      navigate(0);
    },
    getInforUserHome: (state, action) => {
      state.uLogin = action.payload;
    },
    updateUserHome: (state, action) => {
      state.uLogin = action.payload;
    },
  },
});
//truyền action
export const { loginForm, getInforUserHome, logoutForm, updateUserHome } =
  FormReducer.actions;
export default FormReducer.reducer;
