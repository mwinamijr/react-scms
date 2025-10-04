import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import { listUsers, deleteUser } from "../../features/user/userSlice";
import type { RootState } from "../../app/store"; // adjust path
import type { ColumnsType } from "antd/es/table";
import type { ChangeEvent } from "react";
import { useAppDispatch } from "../../app/hooks";

const { Title } = Typography;

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  isAdmin: boolean;
  isTeacher: boolean;
  isAccountant: boolean;
  isParent?: boolean;
}

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector(
    (state: RootState) => state.getUsers
  );

  const [filters, setFilters] = useState<{
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  }>({
    first_name: null,
    last_name: null,
    email: null,
  });

  useEffect(() => {
    dispatch(listUsers({}));
  }, [dispatch]);

  const handleFilter = () => {
    const query: Record<string, string> = {};

    if (filters.first_name) query.first_name = filters.first_name;
    if (filters.last_name) query.last_name = filters.last_name;
    if (filters.email) query.email = filters.email;

    dispatch(listUsers(query));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => message.success("User deleted successfully"))
      .catch(() => message.error("Failed to delete user"));
  };

  const columns: ColumnsType<User> = [
    {
      title: "Adm No",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Full Name or Email",
      key: "fullName",
      render: (_, record) =>
        record.email || `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Admin",
      key: "isAdmin",
      render: (_, record) =>
        record.isAdmin ? <CheckOutlined /> : <CloseOutlined />,
    },
    {
      title: "Teacher",
      key: "isTeacher",
      render: (_, record) =>
        record.isTeacher ? <CheckOutlined /> : <CloseOutlined />,
    },
    {
      title: "Accountant",
      key: "isAccountant",
      render: (_, record) =>
        record.isAccountant ? <CheckOutlined /> : <CloseOutlined />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
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
            value={filters.first_name || ""}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Input
            name="last_name"
            placeholder="Enter last name"
            value={filters.last_name || ""}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Input
            name="email"
            placeholder="Enter email"
            value={filters.email || ""}
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
        dataSource={users}
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
