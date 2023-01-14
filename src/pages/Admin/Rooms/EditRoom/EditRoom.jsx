import { Form, Input, Switch } from "antd";
import React from "react";
import { useEditRoom } from "./useEditRoom";

const EditRoom = (props) => {
  const {
    formik,
    imgSrc,
    handleChangeFile,
    inforRoom,
    handleChangeSetFieldValue,
  } = useEditRoom(props);

  const { handleSubmit, handleChange, values } = formik;
  return (
    <>
      <div>
        <h2
          className="pb-3 text-center"
          style={{ borderBottom: "2px solid #000" }}
        >
          CẬP NHẬT PHÒNG
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
        <Form.Item label="Tên Phòng">
          <Input
            name="tenPhong"
            value={values.tenPhong}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Mã vị trí">
          <Input name="maViTri" value={values.maViTri} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" value={values.moTa} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Sức chứa khách">
          <Input name="khach" value={values.khach} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Giá tiền">
          <Input
            name="giaTien"
            value={values.giaTien}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Phòng ngủ">
          <Input
            name="phongNgu"
            value={values.phongNgu}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Phòng tắm">
          <Input
            name="phongTam"
            value={values.phongTam}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Số lượng giường">
          <Input name="giuong" value={values.giuong} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Máy giặt">
          <Switch
            name="mayGiat"
            checked={values.mayGiat}
            onChange={handleChangeSetFieldValue("mayGiat")}
          />
        </Form.Item>
        <Form.Item label="Bàn Là">
          <Switch
            name="banLa"
            checked={values.banLa}
            onChange={handleChangeSetFieldValue("banLa")}
          />
        </Form.Item>
        <Form.Item label="Tivi">
          <Switch
            name="tivi"
            checked={values.tivi}
            onChange={handleChangeSetFieldValue("tivi")}
          />
        </Form.Item>
        <Form.Item label="Điều hòa">
          <Switch
            name="dieuHoa"
            checked={values.dieuHoa}
            onChange={handleChangeSetFieldValue("dieuHoa")}
          />
        </Form.Item>
        <Form.Item label="Wifi">
          <Switch
            name="wifi"
            checked={values.wifi}
            onChange={handleChangeSetFieldValue("wifi")}
          />
        </Form.Item>
        <Form.Item label="Bãi đỗ">
          <Switch
            name="doXe"
            checked={values.doXe}
            onChange={handleChangeSetFieldValue("doXe")}
          />
        </Form.Item>
        <Form.Item label="Bếp">
          <Switch
            name="bep"
            checked={values.bep}
            onChange={handleChangeSetFieldValue("bep")}
          />
        </Form.Item>

        <Form.Item label="Hồ Bơi">
          <Switch
            name="hoBoi"
            checked={values.hoBoi}
            onChange={handleChangeSetFieldValue("hoBoi")}
          />
        </Form.Item>
        <Form.Item label="Bàn ủi">
          <Switch
            name="banUi"
            checked={values.banUi}
            onChange={handleChangeSetFieldValue("banUi")}
          />
        </Form.Item>

        <Form.Item label={<h6 className="font-weight-bold m-0">Hình ảnh</h6>}>
          <Input type="file" onChange={handleChangeFile} name="hinhAnh" />
        </Form.Item>
        <Form.Item
          label={<h6 className="font-weight-bold m-0">Hình ảnh mô tả:</h6>}
        >
          <img
            src={imgSrc === "" ? inforRoom.hinhAnh : imgSrc}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        </Form.Item>
        <Form.Item label={<h6 className="font-weight-bold m-0">Tác vụ</h6>}>
          <button type="submit" className="btn btn-success">
            Cập Nhật Phòng
          </button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditRoom;
