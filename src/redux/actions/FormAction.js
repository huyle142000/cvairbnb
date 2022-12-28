import axios from "axios";
import { token, USER_LOGIN } from "../../utils/setting";
import Login from "../../pages/Login/Login";
import { toast } from "react-toastify";
import { bothServiceToken } from "../../services/BothTokenService";
import { getInforUserHome, loginForm } from "../reducer/FormReducer";
import { closeModal, openModal } from "../reducer/ModalReducer";

export const loginAction = (userInfo, navigate) => {
  return (dispatch2) => {
    let promise = bothServiceToken.post("auth/signin", userInfo);
    promise.then((result) => {
      toast.success("Login successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch2(closeModal());
      //
      let curUser = result.data.content.user;
      let getToken = JSON.stringify(result.data.content.token);
      localStorage.setItem(token, getToken);
      if (curUser.role.trim().toLowerCase() === "admin") {
        navigate("/admin");
      }
      //
      //
      let userPrev = JSON.parse(localStorage.getItem(USER_LOGIN));
      if (userPrev) {
        if (userPrev.avatar) {
          curUser.avatar = userPrev?.avatar;
        }
      } else {
        curUser.avatar = `https://i.pravatar.cc/50?img=${Math.floor(
          Math.random(1, 20)
        )}`;
      }
      navigate(0);
      let userInfo = JSON.stringify(curUser);
      localStorage.setItem(USER_LOGIN, userInfo);
      //
      dispatch2(loginForm(curUser));
    });
    promise.catch((error) => {
      toast.error(`Login failed! ${error.response?.data.content}`, {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };
};

export const registerAction = (userInfo) => {
  return (dispatch2) => {
    let promise = bothServiceToken.post("auth/signup", userInfo);
    promise.then((result) => {
      toast.success("Register successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch2(openModal(<Login classModal={"form_modal"} />));
    });
    promise.catch((error) => {
      toast.error("Username or email is existed!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error.response?.data);
    });
  };
};

export const getUserInfoAction = (id) => {
  return (dispatch2) => {
    return async (dispatch) => {
      try {
        const { data } = await bothServiceToken.get(`users/${id}`);
        dispatch(getInforUserHome(data.content));
      } catch (e) {
        console.log(e);
      }
    };
  };
};

export const updateUser = (id, user, navigate) => {
  return (dispatch2) => {
    return async (dispatch) => {
      try {
        const { data } = await bothServiceToken.put(`users/${id}`, user);
        getUserInfoAction(id);
        toast.success("Cật nhật thành công");
        navigate("/home");
      } catch (e) {
        console.log(e);
      }
    };
  };
};
// getUserCommentInfo
export const getUserCommentInfo = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get(`users/${id}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
};
