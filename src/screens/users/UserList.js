import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Space,
  Popconfirm,
  message,
} from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Message from "../../components/Message";
import { listUsers, deleteUser } from "./../../features/user/userSlice";

const { Title } = Typography;

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.getUsers);

  const [filters, setFilters] = useState({
    first_name: null,
    last_name: null,
    email: null,
  });

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const handleFilter = () => {
    const query = {};

    if (filters.first_name) query.first_name = filters.first_name;
    if (filters.last_name) query.last_name = filters.last_name;
    if (filters.email) query.email = filters.email;

    dispatch(listUsers(query));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
          <Link to={`/users/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => message.success("User deleted successfully"));
  };

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Users</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Users
      </Title>

      <Row gutter={[16, 16]} className="mb-4" align="middle" justify="start">
        <Col xs={24} sm={12} lg={6}>
          <Button type="default" block>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <UserAddOutlined />
              <Link to="/users/add">Add User</Link>
            </span>
          </Button>
        </Col>
      </Row>

      <Row gutter={16} className="mb-4" align="middle" justify="start">
        <Col xs={24} md={6}>
          <Input
            name="first_name"
            placeholder="Enter first name"
            value={filters.first_name}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Input
            name="last_name"
            placeholder="Enter last name"
            value={filters.last_name}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Input
            name="email"
            placeholder="Enter email"
            value={filters.email}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Button type="primary" onClick={handleFilter} block>
            Apply Filters
          </Button>
        </Col>
      </Row>

      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={users.filter((user) => !user.isParent)}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 20 }}
        bordered
        loading={loading}
        onRow={(record) => ({
          onClick: () => navigate(`/users/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default UserList;
