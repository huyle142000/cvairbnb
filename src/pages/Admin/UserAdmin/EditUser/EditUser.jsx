import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form, Input, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserAPI,
  getInfoUserAPI,
} from "../../../../redux/actions/UserAdminAction";
import { useNavigate, useParams } from "react-router-dom";
export default function EditUser(props) {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.UserManagerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getInfoUserAPI(id));
  }, []);

  const formik = useFormik({
    // bật enableReinitialize khi thế giá trị bằng props nên dùng chỉ cho trang Edit
    enableReinitialize: true,
    initialValues: {
      id: userInfo?.id,
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      birthday: userInfo?.birthday,
      gender: userInfo?.gender,
      role: userInfo?.role,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(editUserAPI(id, values,navigate));
      // resetForm();
    },
  });
  const { handleSubmit, handleChange, setFieldValue, values } = formik;
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
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
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <Form.Item
        label={<h6 className="font-weight-bold m-0">Form Size</h6>}
        name="size"
      >
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Tài khoản</h6>}>
        <Input
          disabled={true}
          name="id"
          value={values.id}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Họ và tên</h6>}>
        <Input name="name" value={values.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Email</h6>}>
        <Input name="email" value={values.email} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label={<h6 className="font-weight-bold m-0">Số điện thoại</h6>}
      >
        <Input
          name="phone"
          value={values.phone}
          className="form-control w-50"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Ngày Sinh</h6>}>
        <Input
          name="birthday"
          value={values.birthday}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label={<h6 className="font-weight-bold m-0">Giới tính</h6>}>
        <select
          className="form-control"
          name="gender"
          onChange={handleChange}
          value={values?.gender}
        >
          <option value="true">Nam</option>
          <option value="false">Nữ</option>
        </select>
      </Form.Item>
      <Form.Item
        label={<h6 className="font-weight-bold m-0">Mã loại người dùng</h6>}
      >
        <select
          className="form-control"
          name="role"
          onChange={handleChange}
          value={values?.role}
        >
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
