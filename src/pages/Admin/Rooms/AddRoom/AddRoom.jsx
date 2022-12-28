import { Form, Input, Switch } from "antd";
import React from "react";
import { useAddRoom } from "./useAddRoom";

export default function AddRoom() {
  const {
    formik,
    imgSrc,
    handleChangeFile,
    handleInput,
    handleChangeSetFieldValue,
  } = useAddRoom();
  const { handleSubmit, handleChange } = formik;
  return (
    <>
      <div>
        <h2
          className="pb-3 text-center"
          style={{ borderBottom: "2px solid #000" }}
        >
          Thêm Phòng
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
        <Form.Item label="Tên Phòng">
          <Input name="tenPhong" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Sức chứa khách">
          <Input name="khach" onChange={handleInput} />
        </Form.Item>
        <Form.Item label="Giá tiền">
          <Input name="giaTien" onChange={handleInput} />
        </Form.Item>
        <Form.Item label="Phòng ngủ">
          <Input name="phongNgu" onChange={handleInput} />
        </Form.Item>
        <Form.Item label="Phòng tắm">
          <Input name="phongTam" onChange={handleInput} />
        </Form.Item>
        <Form.Item label="Số lượng giường">
          <Input name="giuong" onChange={handleInput} />
        </Form.Item>
        <Form.Item label="Máy giặt">
          <Switch
            name="mayGiat"
            onChange={handleChangeSetFieldValue("mayGiat")}
          />
          ;
        </Form.Item>
        <Form.Item label="Bàn Là">
          <Switch name="banLa" onChange={handleChangeSetFieldValue("banLa")} />
        </Form.Item>
        <Form.Item label="Tivi">
          <Switch name="tivi" onChange={handleChangeSetFieldValue("tivi")} />
        </Form.Item>
        <Form.Item label="Điều hòa">
          <Switch
            name="dieuHoa"
            onChange={handleChangeSetFieldValue("dieuHoa")}
          />
        </Form.Item>
        <Form.Item label="Wifi">
          <Switch name="wifi" onChange={handleChangeSetFieldValue("wifi")} />
        </Form.Item>
        <Form.Item label="Bãi đỗ">
          <Switch name="doXe" onChange={handleChangeSetFieldValue("doXe")} />
        </Form.Item>
        <Form.Item label="Bếp">
          <Switch name="bep" onChange={handleChangeSetFieldValue("bep")} />
        </Form.Item>

        <Form.Item label="Hồ Bơi">
          <Switch name="hoBoi" onChange={handleChangeSetFieldValue("hoBoi")} />
        </Form.Item>
        <Form.Item label="Bàn ủi">
          <Switch name="banUi" onChange={handleChangeSetFieldValue("banUi")} />
        </Form.Item>

        <Form.Item label={<h6 className="font-weight-bold m-0">Hình ảnh</h6>}>
          <Input type="file" onChange={handleChangeFile} name="hinhAnh" />
        </Form.Item>
        <Form.Item
          label={<h6 className="font-weight-bold m-0">Hình ảnh mô tả:</h6>}
        >
          <img
            src={imgSrc}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        </Form.Item>
        <Form.Item label={<h6 className="font-weight-bold m-0">Tác vụ</h6>}>
          <button type="submit" className="btn btn-success">
            Thêm Phòng
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
