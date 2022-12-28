import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editLocationAPI,
  getInfoLocationAPI,
} from "../../../../redux/actions/LocationRoomAction";

export const useEditLocation = () => {
  const dispatch = useDispatch();
  const { inforLocation } = useSelector((state) => state.LocationRoomReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getInfoLocationAPI(id));
  }, []);
  let [imgSrc, setImgSrc] = useState("");
  //   formik
  const formik = useFormik({
    // bật enableReinitialize khi thế giá trị bằng props nên dùng chỉ cho trang Edit
    enableReinitialize: true,
    initialValues: {
      id: inforLocation?.id,
      tenViTri: inforLocation?.tenViTri,
      tinhThanh: inforLocation?.tinhThanh,
      quocGia: inforLocation?.quocGia,
      hinhAnh: null,
    },
    onSubmit: (values, { resetForm }) => {
      // vì post có dữ liệu uploadFile nên ta cần tạo 1 formData
      // let formData = new FormData();
      // for (let key in values) {
      //   if (key !== "hinhAnh") {
      //     formData.append(key, values[key]);
      //   } else {
      //     // bởi vì hinhAnh ko thay đổi thì file vẫn giữ giá trị cũ nên ko cần push lên(ở đây giá trị là null)
      // if (values.hinhAnh !== null) {
      //   formData.append("File", values.hinhAnh, values.hinhAnh.name);
      // }
      //   }
      // }
      dispatch(editLocationAPI(values.id, values,navigate));
    },
  });

  // handleInput
  const { setFieldValue } = formik;
  const handleChangeSetFieldValue = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
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
    inforLocation,
  };
};
