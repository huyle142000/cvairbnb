import { toast } from "react-toastify";
import Login from "../../pages/Login/Login";
import { bothServiceToken } from "../../services/BothTokenService";
import { USER_LOGIN } from "../../utils/setting";
import { openModal } from "../reducer/ModalReducer";
import { getInforUser, getUserList } from "../reducer/UserManagerReducer";
export const getUserListAPI = () => {
  return async (dispacth) => {
    try {
      const { data } = await bothServiceToken.get(`users`);
      dispacth(getUserList(data.content));
    } catch (e) {
      console.log(e);
    }
  };
};
//delete
export function deleteUserAPI(user, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.delete(`users?id=${user}`);
      toast.success("Xóa thành công");
      navigate(0);
      getUserListAPI();
    } catch (e) {}
  };
}
//Create User
export function createUser(value, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.post(`users`, value);
      toast.success("Tạo mới User thành công");
      navigate("/admin");
    } catch (e) {}
  };
}

export function getInfoUserAPI(id) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get(`users/${id}`);
      dispatch(getInforUser(data.content));
    } catch (e) {
      console.log(e);
    }
  };
}
// edit User
export function editUserAPI(id, user, navigate) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.put(`users/${id}`, user);

      dispatch(getInfoUserAPI(id));
      if (user.role.trim().toLowerCase() === "admin") {
        getUserListAPI();
        dispatch(openModal(<Login classModal={"form_modal"} />));
        navigate("/admin");
        toast("Hãy đăng nhập tài khoản admin để cấp quyền quản trị!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (user.role.trim().toLowerCase() === "user" && navigate) {
        navigate("/home");
        toast.success("Cật nhật thành công");
        let userInfo = JSON.stringify(data.content);
        localStorage.setItem(USER_LOGIN, userInfo);
      }
    } catch (e) {
      console.log(e);
    }
  };
}
