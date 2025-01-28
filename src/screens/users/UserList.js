import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Space,
  Pagination,
  message,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  listUsers,
  deleteUser,
  resetSuccessDelete,
} from "./../../features/user/userSlice";

const { Title } = Typography;

const UserList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { loading, error, users, successDelete, pagination } = useSelector(
    (state) => state.getUsers
  );

  useEffect(() => {
    dispatch(listUsers({ ...filters, page: currentPage }));

    if (successDelete) {
      message.success("User deleted successfully");
      dispatch(resetSuccessDelete());
    }
  }, [dispatch, successDelete, filters, currentPage]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page on search
    dispatch(listUsers({ ...filters, page: 1 }));
  };

  const columns = [
    {
      title: "Adm No",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Full Name or Email",
      key: "fullName",
      render: (text, record) =>
        record.email || `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Admin",
      key: "isAdmin",
      render: (text, record) =>
        record.isAdmin ? <CheckOutlined /> : <CloseOutlined />,
    },
    {
      title: "Teacher",
      key: "isTeacher",
      render: (text, record) =>
        record.isTeacher ? <CheckOutlined /> : <CloseOutlined />,
    },
    {
      title: "Accountant",
      key: "isAccountant",
      render: (text, record) =>
        record.isAccountant ? <CheckOutlined /> : <CloseOutlined />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/users/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/users/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteHandler(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>

      {/* Title */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Users
      </Title>

      {/* Add User Button */}
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Link to="/users/add">
            <Button type="primary">Add User</Button>
          </Link>
        </Col>
      </Row>

      {/* Search Filters */}
      <Form
        layout="vertical"
        onFinish={handleSearch}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="First Name">
              <Input
                name="first_name"
                placeholder="Enter first name"
                value={filters.first_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Last Name">
              <Input
                name="last_name"
                placeholder="Enter last name"
                value={filters.last_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Email">
              <Input
                name="email"
                placeholder="Enter email"
                value={filters.email}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Users Table */}
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : error ? (
        <div style={{ textAlign: "center", color: "red" }}>{error}</div>
      ) : (
        <>
          <Table
            dataSource={users.filter((user) => !user.isParent)}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
          />
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Pagination
              current={currentPage}
              pageSize={30}
              total={pagination.count}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
