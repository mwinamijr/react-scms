import React, { useEffect, useState, useCallback } from "react";
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
  Popconfirm,
  message,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  listUsers,
  deleteUser,
  resetSuccessDelete,
} from "./../../features/user/userSlice";

const { Title } = Typography;

const UserList = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { loading, error, users, successDelete } = useSelector(
    (state) => state.getUsers
  );

  // ✅ Memoized function to fetch users when searching
  const fetchUsers = useCallback(() => {
    dispatch(listUsers(filters));
  }, [dispatch, filters]);

  // ✅ Fetch users on mount & after deletion
  useEffect(() => {
    fetchUsers(); // Only fetch when component mounts

    if (successDelete) {
      message.success("User deleted successfully");
      dispatch(resetSuccessDelete());
    }
  }, [fetchUsers, successDelete, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Explicitly trigger search (prevents auto API calls)
  const handleSearch = () => {
    fetchUsers();
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
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        style={{ marginBottom: 24 }}
      >
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item>
              <Input
                name="first_name"
                placeholder="Enter first name"
                value={filters.first_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item>
              <Input
                name="last_name"
                placeholder="Enter last name"
                value={filters.last_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item>
              <Input
                name="email"
                placeholder="Enter email"
                value={filters.email}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Button type="primary" htmlType="submit" block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Users Table */}
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          dataSource={users.filter((user) => !user.isParent)}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 20 }}
          bordered
        />
      )}
    </div>
  );
};

export default UserList;
