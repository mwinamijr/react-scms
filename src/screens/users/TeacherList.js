import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Space,
  Typography,
  Row,
  Col,
  Button,
  message,
  Popconfirm,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import Message from "../../components/Message";
import { listTeachers, deleteTeacher } from "../../features/user/teacherSlice";

const { Title } = Typography;

const TeacherList = () => {
  const dispatch = useDispatch();

  // Access teacher state from the store
  const { loading, error, teachers } = useSelector(
    (state) => state.getTeachers
  );

  useEffect(() => {
    dispatch(listTeachers()); // Dispatch the action to fetch teachers
  }, [dispatch]);

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Emp ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (text, record) => `${record.first_name} ${record.last_name}`,
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
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/users/teachers/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
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

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteTeacher(id))
      .unwrap()
      .then(() => message.success("Teacher deleted successfully"));
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Teachers</Breadcrumb.Item>
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
              <Link to="/users/teachers/add">Add Teacher</Link>
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
              <Link to="/users/teachers/upload">Bulk Upload</Link>
            </span>
          </Button>
        </Col>
      </Row>

      {/* Content */}
      {error && <Message variant="danger">{error}</Message>}

      <Table
        dataSource={teachers}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
    </div>
  );
};

export default TeacherList;
