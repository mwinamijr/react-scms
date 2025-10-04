import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Space,
  Typography,
  Row,
  Col,
  Button,
  Input,
  message,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Message from "../../components/Message";
import { listTeachers, deleteTeacher } from "../../features/user/teacherSlice";
import type { RootState } from "../../app/store"; // adjust paths as needed
import { useAppDispatch } from "../../app/hooks";

const { Title } = Typography;

interface Teacher {
  id: number;
  empId: string;
  first_name: string;
  last_name: string;
  short_name: string;
  salary: number;
  email?: string;
}

interface Filters {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

const TeacherList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, teachers } = useSelector(
    (state: RootState) => state.getTeachers
  );

  const [filters, setFilters] = useState<Filters>({
    first_name: null,
    last_name: null,
    email: null,
  });

  useEffect(() => {
    dispatch(listTeachers({}));
  }, [dispatch]);

  const handleFilter = () => {
    const query: Record<string, string> = {};
    if (filters.first_name) query.first_name = filters.first_name;
    if (filters.last_name) query.last_name = filters.last_name;
    if (filters.email) query.email = filters.email;

    dispatch(listTeachers(query));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTeacher(id))
      .unwrap()
      .then(() => message.success("Teacher deleted successfully"))
      .catch(() => message.error("Failed to delete teacher"));
  };

  const columns = [
    {
      title: "Emp ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (_: any, record: Teacher) =>
        `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Short Name",
      dataIndex: "short_name",
      key: "short_name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Teacher) => (
        <Space size="middle">
          <Link to={`/users/teachers/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this teacher?"
            onConfirm={() => handleDelete(record.id)}
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
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Teachers</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Teachers
      </Title>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12} lg={6}>
          <Button type="default" block>
            <span className="flex items-center justify-center gap-2">
              <UserAddOutlined />
              <Link to="/users/teachers/add">Add Teacher</Link>
            </span>
          </Button>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Button type="default" block>
            <span className="flex items-center justify-center gap-2">
              <UploadOutlined />
              <Link to="/users/teachers/upload">Bulk Upload</Link>
            </span>
          </Button>
        </Col>
      </Row>

      <Row gutter={16} className="mb-4" align="middle" justify="start">
        <Col xs={24} md={6}>
          <Input
            name="first_name"
            placeholder="Enter first name"
            value={filters.first_name ?? ""}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Input
            name="last_name"
            placeholder="Enter last name"
            value={filters.last_name ?? ""}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Input
            name="email"
            placeholder="Enter email"
            value={filters.email ?? ""}
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

      <Table<Teacher>
        dataSource={teachers}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        loading={loading}
        onRow={(record) => ({
          onClick: () => navigate(`/users/teachers/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default TeacherList;
