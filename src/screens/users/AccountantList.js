import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Space, Typography, Row, Col, Button } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Message from "../../components/Message";
import { listAccountants } from "../../features/user/accountantSlice";

const { Title } = Typography;

const AccountantList = () => {
  const dispatch = useDispatch();

  // Access teacher state from the store
  const { loading, error, accountants } = useSelector(
    (state) => state.getAccountants
  );

  useEffect(() => {
    dispatch(listAccountants()); // Dispatch the action to fetch accountants
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
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/users/accountants/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/users/accountants/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  // Handle delete action
  const handleDelete = (id) => {
    console.log("Delete teacher with ID:", id);
    // Add delete logic here
  };

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Accountants</Breadcrumb.Item>
      </Breadcrumb>

      {/* Title */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Accountants
      </Title>
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12} lg={6}>
          <Button type="default" icon={<UserAddOutlined />} block>
            <Link to="/users/accountants/add">Add Accountant</Link>
          </Button>
        </Col>
      </Row>

      {/* Content */}
      {error && <Message variant="danger">{error}</Message>}
      <Table
        dataSource={accountants}
        columns={columns}
        rowKey="id"
        bordered
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default AccountantList;
