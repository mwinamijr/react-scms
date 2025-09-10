import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Row,
  Col,
  Input,
  Button,
  Select,
  message,
  Space,
  Popconfirm,
  Typography,
} from "antd";
import {
  EditOutlined,
  UserAddOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Message from "../../components/Message";
import {
  listStudents,
  deleteStudent,
} from "../../features/students/studentSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

const { Title } = Typography;
const { Option } = Select;

interface Student {
  id: number;
  admission_number: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  class_level_display: string;
  gender: string;
}

interface Filters {
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  class_level: string | null;
}

const Students: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, students } = useSelector(
    (state: RootState) => state.getStudents
  );

  const [filters, setFilters] = useState<Filters>({
    first_name: null,
    middle_name: null,
    last_name: null,
    class_level: null,
  });

  useEffect(() => {
    dispatch(listStudents({}));
  }, [dispatch]);

  const handleFilter = () => {
    const query: Partial<Filters> = {};

    if (filters.first_name) query.first_name = filters.first_name;
    if (filters.middle_name) query.middle_name = filters.middle_name;
    if (filters.last_name) query.last_name = filters.last_name;
    if (filters.class_level) query.class_level = filters.class_level;

    dispatch(listStudents(query));
  };

  const handleClassChange = (value: string | undefined) => {
    setFilters({ ...filters, class_level: value ?? null });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value || null });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteStudent(id))
      .unwrap()
      .then(() => message.success("Student deleted successfully"));
  };

  const columns = [
    {
      title: "Admission No",
      dataIndex: "admission_number",
      key: "admission_number",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "fullName",
    },
    {
      title: "Class Level",
      dataIndex: "class_level_display",
      key: "class_level",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: Student) => (
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
          <Link to={`/sis/students/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this student?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(record.id);
            }}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="students-page">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Students
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
              <Link to="/sis/students/add">Add Student</Link>
            </span>
          </Button>
        </Col>
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
              <UploadOutlined />
              <Link to="/sis/students/upload">Bulk Upload</Link>
            </span>
          </Button>
        </Col>
      </Row>

      <Row gutter={16} className="mb-4">
        <Col xs={24} sm={12} md={5}>
          <Input
            name="first_name"
            placeholder="Enter first name"
            value={filters.first_name ?? ""}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={5}>
          <Input
            name="middle_name"
            placeholder="Enter middle name"
            value={filters.middle_name ?? ""}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={5}>
          <Input
            name="last_name"
            placeholder="Enter last name"
            value={filters.last_name ?? ""}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} md={5}>
          <Select
            placeholder="Select Class Level"
            onChange={handleClassChange}
            allowClear
            style={{ width: "100%" }}
            value={filters.class_level ?? undefined}
          >
            <Option value="Form One">Form One</Option>
            <Option value="Form Two">Form Two</Option>
            <Option value="Form Three">Form Three</Option>
            <Option value="Form Four">Form Four</Option>
          </Select>
        </Col>
        <Col xs={24} md={4}>
          <Button type="primary" onClick={handleFilter} block>
            Apply Filters
          </Button>
        </Col>
      </Row>

      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={students}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 40 }}
        loading={loading}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => navigate(`/sis/students/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default Students;
