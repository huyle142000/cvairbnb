import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { Input } from "antd";

import { NavLink, useNavigate } from "react-router-dom";
import "../admincss.css";

import Axios from "axios";
import { TOKEN } from "../../../utils/setting";
import {
  deleteLocationAPI,
  getListLocationAPI,
} from "../../../redux/actions/LocationRoomAction";
import { getLocationList } from "../../../redux/reducer/LocationRoomReducer";

const { Search } = Input;

const ListLocation = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const onSearch = (value) => {
    dispatch();
  };
  //selector,dispatch
  const { locationList } = useSelector((state) => state.LocationRoomReducer);

  useEffect(() => {
    dispatch(getListLocationAPI());
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
      title: "Tên Vị Trí",
      dataIndex: "tenViTri",
      key: "tenViTri",
    },
    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      sorter: (a, b) => {
        let tinhThanhA = a.tinhThanh.toLowerCase().trim();
        let tinhThanhB = b.tinhThanh.toLowerCase().trim();

        if (tinhThanhA > tinhThanhB) return 1;
        return -1;
      },
    },
    {
      title: "Quốc Gia",
      dataIndex: "quocGia",
      key: "quocGia",
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
                  dispatch(deleteLocationAPI(vitri.id,navigate));
                }
              }}
            >
              Xóa
            </span>
          </div>
          <div>
            <NavLink to={`/admin/editvitri/${vitri.id}`}>
              <EditOutlined className="movie_admin-icon text-info" />
              <span className="movie_admin-icon text-info">Chỉnh sửa</span>
            </NavLink>
          </div>
          <div>
            <NavLink to={`/admin/rooms/${vitri.id}`}>
              <CalendarOutlined className="movie_admin-icon text-warning" />
              <span className="movie_admin-icon text-warning">
                + Xem các phòng đang cho thuê
              </span>
            </NavLink>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Quản lý vị trí</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/admin/addlocation");
          }}
        >
          Tôi muốn thêm vị trí
        </button>
      </div>

      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <hr />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={locationList}
        onChange={handleChange}
      />
    </>
  );
};
export default ListLocation;
