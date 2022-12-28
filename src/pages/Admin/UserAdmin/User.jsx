import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import "../admincss.css";
import {
  deleteUserAPI,
  getUserListAPI,
} from "../../../redux/actions/UserAdminAction";
const { Search } = Input;

const User = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const onSearch = (value) => {
    // dispatch(searchUser(value));
  };
  //selector,dispatch
  useEffect(() => {
    dispatch(getUserListAPI());
  }, []);
  const { userList } = useSelector((state) => state.UserManagerReducer);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 200,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Họ và Tên",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name - b.name,
    },
    {
      width: 130,
      title: "Ngày Sinh",
      dataIndex: "birthday",
      key: "birthday",
      sorter: (a, b) => a.birthday - b.birthday,
    },
    {
      width: 170,
      title: "Loại người dùng",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },

    {
      width: 180,
      title: <h6>Tác vụ</h6>,
      dataIndex: "",
      key: "x",
      render: (text, user) => (
        <>
          <div>
            <DeleteOutlined className="movie_admin-icon text-danger" />
            <span
              className="movie_admin-icon text-danger"
              onClick={() => {
                if (window.confirm("Bạn muốn xóa người dùng này không?")) {
                  dispatch(deleteUserAPI(user.id, navigate));
                }
              }}
            >
              Xóa
            </span>
          </div>
          <div>
            <NavLink to={`/admin/edituser/${user.id}`}>
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
        <h3>Quản lý người dùng</h3>
        <button
          className="btn btn-warning text-dark font-weight-bold"
          onClick={() => {
            navigate("/admin/adduser");
          }}
        >
          Tôi muốn thêm người dùng
        </button>
      </div>

      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <hr />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={userList}
        onChange={handleChange}
      />
    </>
  );
};
export default User;
