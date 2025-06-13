import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Space,
  Typography,
  Button,
  Input,
  Row,
  Col,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { RootState } from "../../app/store";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { listParents, deleteParent } from "../../features/user/parentSlice";
import { useAppDispatch } from "../../app/hooks";

const { Title, Text } = Typography;

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface FilterState {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

const ParentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterState>({
    first_name: null,
    last_name: null,
    email: null,
  });

  const { loading, error, parents } = useSelector(
    (state: RootState) => state.getParents
  );

  useEffect(() => {
    dispatch(listParents());
  }, [dispatch]);

  const handleFilter = () => {
    const query: Record<string, string> = {};
    if (filters.first_name) query.first_name = filters.first_name;
    if (filters.last_name) query.last_name = filters.last_name;
    if (filters.email) query.email = filters.email;
    dispatch(listParents(query));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value || null }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteParent(id))
      .unwrap()
      .then(() => message.success("Parent deleted successfully"))
      .catch(() => message.error("Failed to delete parent"));
  };

  const columns: ColumnsType<Parent> = [
    {
      title: "Full Name",
      key: "fullName",
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
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

      {error && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Text type="danger">{error}</Text>
        </div>
      )}

      <Table
        dataSource={parents}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 20 }}
        loading={loading}
        onRow={(record) => ({
          onClick: () => navigate(`/users/parents/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

export default ParentList;
