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
  Form,
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

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    class_level: "",
  });

  const { loading, error, students } = useSelector(
    (state) => state.getStudents
  );

  useEffect(() => {
    dispatch(listStudents({ ...filters }));
  }, [dispatch, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    dispatch(listStudents({ ...filters }));
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
        Teachers
      </Title>

      <Row gutter={[16, 16]} className="mb-4">
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

      <Form layout="vertical" onFinish={handleSearch}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="First Name">
              <Input
                name="first_name"
                placeholder="Enter first name"
                value={filters.first_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Middle Name">
              <Input
                name="middle_name"
                placeholder="Enter middle name"
                value={filters.middle_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Last Name">
              <Input
                name="last_name"
                placeholder="Enter last name"
                value={filters.last_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Class Level">
              <Input
                name="class_level"
                placeholder="Enter class level"
                value={filters.class_level}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

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
