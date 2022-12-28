import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Register from "../Register/Register";
import { openModal } from "../../redux/reducer/ModalReducer";
import * as Yup from "yup";
import { loginAction } from "../../redux/actions/FormAction";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(3, "Mật khẩu ít nhất có 3 kí tự."),
    }),
    onSubmit: (values) => {
      dispatch(loginAction(values, navigate));
    },
  });

  return (
    <div className="login_box">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="user_box">
          <label>Account</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="email"
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-danger text-register d-block mb-2">
              {formik.errors.email}
            </span>
          ) : null}
        </div>
        <div className="user_box">
          <label>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="text-danger text-register d-block mb-2 ">
              {formik.errors.password}
            </span>
          ) : null}
        </div>
        <div className="btn_div">
          <div>
            <button type="submit" className="btn_primary">
              Submit
            </button>
          </div>
          <div className=" text-right">
            <h6
              className="text-danger isuser btn"
              onClick={() => {
                dispatch(openModal(<Register classModal={"form_modal"} />));
              }}
            >
              Bạn có tài khoản chưa?
            </h6>
          </div>
        </div>
      </form>
    </div>
  );
}
