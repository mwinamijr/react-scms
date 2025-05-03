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

const { Title } = Typography;
const { Option } = Select;

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, students } = useSelector(
    (state) => state.getStudents
  );

  const [filters, setFilters] = useState({
    first_name: null,
    middle_name: null,
    last_name: null,
    class_level: null,
  });

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);

  const handleFilter = () => {
    const query = {};

    if (filters.first_name) query.first_name = filters.first_name;
    if (filters.middle_name) query.middle_name = filters.middle_name;
    if (filters.last_name) query.last_name = filters.last_name;
    if (filters.class_level) query.class_level = filters.class_level;

    dispatch(listStudents(query));
  };

  const handleClassChange = (value) => {
    setFilters({ ...filters, class_level: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Addmission No",
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
      render: (text, record) => (
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
          <Link to={`/sis/students/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this student?"
            onConfirm={() => handleDelete(record.id)}
            onClick={(e) => e.stopPropagation()}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteStudent(id))
      .unwrap()
      .then(() => message.success("Student deleted successfully"));
  };

  return (
    <div className="students-page">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
      </Breadcrumb>

      {/* Title */}
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
            label="First Name"
            name="first_name"
            placeholder="Enter first name"
            value={filters.first_name}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={5}>
          <Input
            label="Middle Name"
            name="middle_name"
            placeholder="Enter middle name"
            value={filters.middle_name}
            onChange={handleInputChange}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={5}>
          <Input
            label="Last Name"
            name="last_name"
            placeholder="Enter last name"
            value={filters.last_name}
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

      {/* Content */}
      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={students}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        loading={loading}
        onRow={(record) => ({
          onClick: () => navigate(`/sis/students/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default Students;
