import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb, Table, Space, Typography, Row, Col, Button } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Message from "../../components/Message";
import { listAccountants } from "../../features/user/accountantSlice";
import type { RootState } from "../../app/store";
import type { ColumnsType } from "antd/es/table";
import { useAppDispatch } from "../../app/hooks";

const { Title } = Typography;

interface PersonName {
  first_name: string;
  middle_name?: string;
  last_name: string;
}

interface Accountant extends PersonName {
  id: number;
  phone_number: string;
  gender: string;
  salary: number;
}

const AccountantList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { loading, error, accountants } = useSelector(
    (state: RootState) => state.getAccountants
  );

  useEffect(() => {
    dispatch(listAccountants());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    console.log("Delete accountant with ID:", id);
    // Add delete logic here
  };

  const columns: ColumnsType<Accountant> = [
    {
      title: "Emp ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (_: unknown, record: Accountant) =>
        `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Accountant) => (
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

      {/* Add Accountant Button */}
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
              <Link to="/users/accountants/add">Add Accountant</Link>
            </span>
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
