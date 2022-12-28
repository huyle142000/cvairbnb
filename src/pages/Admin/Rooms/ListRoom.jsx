import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Input } from "antd";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../admincss.css";

import {
  deleteRoomAPI,
  getInfoLocationAPI,
  getListRoomAPI,
} from "../../../redux/actions/LocationRoomAction";

const { Search } = Input;

const ListRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inforLocation } = useSelector((state) => state.LocationRoomReducer);
  const { id } = useParams();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const onSearch = (value) => {};
  const { roomList } = useSelector((state) => state.LocationRoomReducer);

  useEffect(() => {
    dispatch(getListRoomAPI(id));
    dispatch(getInfoLocationAPI(id));
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 20,
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Tên Phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      width: "200px",

      sorter: (a, b) => {
        let tenPhongA = a.tenPhong.toLowerCase().trim();
        let tenPhongB = b.tenPhong.toLowerCase().trim();

        if (tenPhongA > tenPhongB) return 1;
        return -1;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "300px",
      render: (text, room) => {
        // cl
        return (
          <p>
            {room.moTa.length > 40
              ? room.moTa.slice(0, 70) + "...."
              : room.moTa}
          </p>
        );
      },
    },
    {
      title: "Sức chứa",
      dataIndex: "khach",
      key: "khach",
      width: "100px",
    },
    {
      width: "100px",

      title: "Giá tiền",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (text, room) => {
        return <p className="text-danger text-center">{room.giaTien + "$"}</p>;
      },
    },

    {
      title: "Tác vụ",
      dataIndex: "",
      key: "x",
      render: (text, vitri) => (
        <>
          <div>
            <DeleteOutlined className="movie_admin-icon text-danger" />
            <span
              className="movie_admin-icon text-danger"
              onClick={() => {
                if (window.confirm("Bạn muốn xóa vị trí này ?")) {
                  dispatch(deleteRoomAPI(vitri.id, navigate));
                }
              }}
            >
              Xóa
            </span>
          </div>
          <div>
            <NavLink to={`/admin/editroom/${vitri.id}`}>
              <EditOutlined className="movie_admin-icon text-info" />
              <span className="movie_admin-icon text-info">Chỉnh sửa</span>
            </NavLink>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>
          Quản lý các phòng đang cho thuê tại:
          {` ${inforLocation?.tenViTri}, ${inforLocation?.tinhThanh}, ${inforLocation?.quocGia}`}{" "}
        </h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(`/admin/addroom/${id}`);
          }}
        >
          Tôi muốn thêm phòng tại vị trí này
        </button>
      </div>

      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <hr />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={roomList}
        onChange={handleChange}
      />
    </>
  );
};
export default ListRoom;
