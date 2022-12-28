import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editRoomAPI,
  getInfoRoomAPI,
  uploadRoomAPI,
} from "../../../../redux/actions/LocationRoomAction";

export const useAddRoom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  let [imgSrc, setImgSrc] = useState("");
  //   formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: 0,
      tenPhong: "string",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "string",
      giaTien: 0,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: id,
      hinhAnh: "string",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(uploadRoomAPI(values, navigate));
    },
  });

  // handleInput
  const { setFieldValue } = formik;
  const handleChangeSetFieldValue = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, Number(value));
  };
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    const typeFile = ["image/jpeg", "image/jpg", "image/gif", "image/png"];
    if (typeFile.includes(file.type)) {
      // lưu file vào formik
      await setFieldValue("hinhAnh", file);
      // tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
        setFieldValue("hinhAnh", e.target.result);
      };
      return;
    }
    alert("File chọn không phải kiểu hình ảnh");
  };
  return {
    formik,
    imgSrc,
    handleChangeSetFieldValue,
    handleChangeFile,
    handleInput,
  };
};
