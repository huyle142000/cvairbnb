import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useEditLocation } from "./useEditLocation";
import { useDispatch } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";

const EditLocation = (props) => {
  const {
    formik,
    imgSrc,
    handleChangeFile,
    inforLocation,
  } = useEditLocation(props);
  const { handleSubmit, handleChange, values } = formik;
  return (
    <>
      <div>
        <h2
          className="pb-3 text-center"
          style={{ borderBottom: "2px solid #000" }}
        >
          CẬP NHẬT VỊ TRÍ
        </h2>
      </div>
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
      >
        <Form.Item label="Mã ID">
          <Input name="id" value={values.id} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Vị trí">
          <Input
            name="tenViTri"
            value={values.tenViTri}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Tỉnh thành">
          <Input
            name="tinhThanh"
            value={values.tinhThanh}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Quốc gia">
          <Input
            name="quocGia"
            value={values.quocGia}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label={<h6 className="font-weight-bold m-0">Hình ảnh</h6>}>
          <input type="file" onChange={handleChangeFile} name="hinhAnh" />
          <img
            src={imgSrc === "" ? inforLocation.hinhAnh : imgSrc}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        </Form.Item>
        <Form.Item label={<h6 className="font-weight-bold m-0">Tác vụ</h6>}>
          <button type="submit" className="btn btn-success">
            Cập Nhật Vị Trí
          </button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditLocation;
