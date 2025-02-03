import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Space,
  Typography,
  Spin,
  Button,
  Input,
  Row,
  Col,
  Form,
  Popconfirm,
  message,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  listParents,
  deleteParent,
  resetSuccessDelete,
} from "../../features/user/parentSlice"; // Updated import

const { Title, Text } = Typography;

const ParentList = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { loading, error, parents, successDelete } = useSelector(
    (state) => state.getParents
  ); // Using the parent slice state

  useEffect(() => {
    dispatch(listParents(filters));

    if (successDelete) {
      message.success("Parent deleted successfully!");
      dispatch(resetSuccessDelete());
    }
  }, [dispatch, successDelete, filters]);

  const handleSearch = () => {
    dispatch(listParents(filters));
  };

  const handleDelete = (id) => {
    dispatch(deleteParent(id));
  };

  const columns = [
    {
      title: "Full Name",
      key: "fullName",
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/users/parents/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/users/parents/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Are you sure to delete this parent?"
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
        <Breadcrumb.Item>Parents</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Parents
      </Title>

      <Form
        layout="inline"
        onFinish={handleSearch}
        style={{ marginBottom: 16 }}
      >
        <Row gutter={16} style={{ width: "100%" }}>
          <Col xs={24} md={6}>
            <Form.Item>
              <Input
                placeholder="First Name"
                value={filters.first_name}
                onChange={(e) =>
                  setFilters({ ...filters, first_name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item>
              <Input
                placeholder="Last Name"
                value={filters.last_name}
                onChange={(e) =>
                  setFilters({ ...filters, last_name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item>
              <Input
                placeholder="Email"
                value={filters.email}
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })
                }
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

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Text type="danger">{error}</Text>
        </div>
      ) : (
        <Table
          dataSource={parents}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default ParentList;
