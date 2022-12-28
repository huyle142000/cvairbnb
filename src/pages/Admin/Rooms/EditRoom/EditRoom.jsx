import { Form, Input } from "antd";
import React from "react";
import { useEditRoom } from "./useEditRoom";

const EditRoom = (props) => {
  const { formik, imgSrc, handleChangeFile, inforRoom } = useEditRoom(props);

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
          <select
            name="mayGiat"
            value={values.mayGiat}
            onChange={handleChange}
            id=""
          >
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>
        <Form.Item label="Bàn Là">
          <select
            name="banLa"
            value={values.banLa}
            onChange={handleChange}
            id=""
          >
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>
        <Form.Item label="Tivi">
          <select
            name="tivi"
            value={values.tivi}
            onChange={handleChange}
            id=""
          >
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>
        <Form.Item label="Điều hòa">
          <select
            name="dieuHoa"
            value={values.dieuHoa}
            onChange={handleChange}
            id=""
          >
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>
        <Form.Item label="Wifi">
          <select name="wifi" value={values.wifi} onChange={handleChange} id="">
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>
        <Form.Item label="Bãi đỗ">
          <select name="doXe" value={values.doXe} onChange={handleChange} id="">
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>
        <Form.Item label="Bếp">
          <select name="bep" value={values.bep} onChange={handleChange} id="">
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>

        <Form.Item label="Hồ Bơi">
          <select
            name="hoBoi"
            value={values.hoBoi}
            onChange={handleChange}
            id=""
          >
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
        </Form.Item>
        <Form.Item label="Bàn ủi">
          <select
            name="banUi"
            value={values.banUi}
            onChange={handleChange}
            id=""
          >
            <option value={true}>Có</option>
            <option value={false}>Không</option>
          </select>
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
