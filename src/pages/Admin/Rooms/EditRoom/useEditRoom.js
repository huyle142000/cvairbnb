import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editRoomAPI,
  getInfoRoomAPI,
} from "../../../../redux/actions/LocationRoomAction";

export const useEditRoom = (props) => {
  const dispatch = useDispatch();
  const { inforRoom } = useSelector((state) => state.LocationRoomReducer);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInfoRoomAPI(id));

    handleChangeSetFieldValue();
  }, []);
  useEffect(() => {
    console.log(Object.keys(inforRoom), "12");
    let arrKeyOfRoom = Object.keys(inforRoom);
    if (arrKeyOfRoom != 0) {
      arrKeyOfRoom.map((room, i) => {
        handleChangeSetFieldValue(room, inforRoom[room]);
      });
    }
  }, [inforRoom]);
  let [imgSrc, setImgSrc] = useState("");
  //   formik
  const formik = useFormik({
    // bật enableReinitialize khi thế giá trị bằng props nên dùng chỉ cho trang Edit
    enableReinitialize: true,
    initialValues: {
      id: inforRoom?.id,
      tenPhong: inforRoom?.tenPhong,
      khach: inforRoom?.khach,
      phongNgu: inforRoom?.phongNgu,
      giuong: inforRoom?.giuong,
      phongTam: inforRoom?.phongTam,
      moTa: inforRoom?.moTa,
      giaTien: inforRoom?.giaTien,
      mayGiat: inforRoom?.mayGiat,
      banLa: inforRoom?.banLa,
      tivi: inforRoom?.tivi,
      dieuHoa: inforRoom?.dieuHoa,
      wifi: inforRoom?.wifi,
      bep: inforRoom?.bep,
      doXe: inforRoom?.doXe,
      hoBoi: inforRoom?.hoBoi,
      banUi: inforRoom?.banUi,
      maViTri: inforRoom?.maViTri,
      hinhAnh: null,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(editRoomAPI(values.id, values,navigate));
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
        formik.setFieldValue("hinhAnh", e.target.result);
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
    inforRoom,
  };
};
