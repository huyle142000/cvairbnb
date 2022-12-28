import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAddLocation } from "./useAddLocation";
const AddLocation = () => {
  const { formik, handleChangeFile, imgSrc } = useAddLocation();
  const { handleSubmit, handleChange } = formik;
  return (
    <Form
      className="vh-100"
      onSubmitCapture={handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="Mã ID">
        <Input name="id" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Vị trí">
        <Input name="tenViTri" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Tỉnh thành">
        <Input name="tinhThanh" onChange={handleChange} />
      </Form.Item>

      <Form.Item label="Quốc gia">
        <Input name="quocGia" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input type="file" onChange={handleChangeFile} name="hinhAnh" />
        <img src={imgSrc} style={{ width: "200px", height: "200px" }} alt="" />
      </Form.Item>
      <Form.Item label="Tác vụ">
        <button type="submit" className="btn btn-success">
          Thêm vị trí
        </button>
      </Form.Item>
    </Form>
  );
};
export default AddLocation;
