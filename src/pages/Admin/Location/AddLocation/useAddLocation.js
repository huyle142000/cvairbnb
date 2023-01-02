import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadLocation } from "../../../../redux/actions/LocationRoomAction";

export const useAddLocation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   formik
  const formik = useFormik({
    initialValues: {
      id: 0,
      tenViTri: "string",
      tinhThanh: "string",
      quocGia: "string",
      hinhAnh: "string",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(uploadLocation(values,navigate));
    },
  });
  let [imgSrc, setImgSrc] = useState("");

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    const typeFile = ["image/jpeg", "image/jpg", "image/gif", "image/png"];
    if (typeFile.includes(file.type)) {
      // tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
        formik.setFieldValue("hinhAnh", e.target.result);
      };
      return;
    }
    alert("File chọn không phải kiểu hình ảnh");
  };
  return {
    formik,
    handleChangeFile,
    imgSrc,
  };
};
