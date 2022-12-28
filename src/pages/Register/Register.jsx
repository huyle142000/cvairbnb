import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./register.css";
import { registerAction } from "../../redux/actions/FormAction";
// import "./../Login/login.scss"
export default function Register() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      isPassword: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "USER",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(3, "Mật khẩu ít nhất có 3 kí tự."),
      isPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu chưa hợp lệ")
        .required("Mật khẩu không được để trống"),
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email chưa đúng định dạng"),
      name: Yup.string()
        .required("Họ tên không được để trống")
        .matches(/^[A-Z a-z]+$/, "Họ tên không đúng định dạng"),
      phone: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]*$/, "Số điện thoại phải là số"),
    }),
    onSubmit: (values) => {
      dispatch(registerAction(values));
    },
  });

  return (
    <div className="login_box">
      <h2 className="pb-4">Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="user_box">
              <label>Username</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="name"
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="text-danger text-register d-block mb-2">
                  {formik.errors.name}
                </span>
              ) : null}
            </div>
            <div className="user_box">
              <label>Email</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="text-danger text-register d-block mb-2">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="user_box">
              <label>Phone number</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="phone"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <span className="text-danger text-register d-block mb-2">
                  {formik.errors.phone}
                </span>
              ) : null}
            </div>
          </div>
          <div className="col-6">
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
            <div className="user_box">
              <label>Password Confirm</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="isPassword"
              />
              {formik.touched.isPassword && formik.errors.isPassword ? (
                <span className="text-danger text-register d-block mb-2">
                  {formik.errors.isPassword}
                </span>
              ) : null}
            </div>
          </div>
          <button type="submit" className="btn btn_primary" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
