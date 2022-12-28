import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form, Input, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../../redux/actions/UserAdminAction";
export default function AddUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    // bật enableReinitialize khi thế giá trị bằng props nên dùng chỉ cho trang Edit
    enableReinitialize: true,
    initialValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: true,
      role: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(createUser(values, navigate));
      resetForm();
    },
  });
  const { handleSubmit, handleChange } = formik;
  return (
    <Form
      className="mt-4"
      onSubmitCapture={handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
    >
      <Form.Item label={<h6 className="font-weight-bold m-0">Tài khoản</h6>}>
        <Input name="id" onChange={handleChange} />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Họ và tên</h6>}>
        <Input name="name" onChange={handleChange} />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Email</h6>}>
        <Input name="email" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label={<h6 className="font-weight-bold m-0">Số điện thoại</h6>}
      >
        <Input
          name="phone"
          className="form-control w-50"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Ngày Sinh</h6>}>
        <Input name="birthday" onChange={handleChange} />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Giới tính</h6>}>
        <select className="form-control" name="gender" onChange={handleChange}>
          <option value="true">Nam</option>
          <option value="false">Nữ</option>
        </select>
      </Form.Item>
      <Form.Item
        label={<h6 className="font-weight-bold m-0">Mã loại người dùng</h6>}
      >
        <select className="form-control" name="role" onChange={handleChange}>
          <option value="USER">Khách Hàng</option>
          <option value="ADMIN">Quản trị</option>
        </select>
      </Form.Item>

      <Form.Item label={<h6 className="font-weight-bold m-0">Tác vụ</h6>}>
        <button type="submit" className="btn btn-success">
          Cập nhật người dùng
        </button>
      </Form.Item>
    </Form>
  );
}
