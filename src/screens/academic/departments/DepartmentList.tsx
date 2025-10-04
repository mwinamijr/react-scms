import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, message, Popconfirm, Space, Col, Row } from "antd";
import { useSelector } from "react-redux";
import {
  listDepartments,
  deleteDepartment,
} from "../../../features/academic/departmentSlice";
import Message from "../../../components/Message";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

// Define Department type based on your data shape
interface Department {
  id: number;
  name: string;
}

const DepartmentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { departments, loading, error } = useSelector(
    (state: RootState) => state.getDepartments
  );

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteDepartment(id))
      .unwrap()
      .then(() => message.success("Department deleted successfully"))
      .catch((err: string) => message.error(err));
  };

  const columns = [
    { title: "Order", dataIndex: "order_rank", key: "order" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (record: Department) => (
        <Space size="middle">
          <Link to={`/academic/departments/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/academic/departments/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this department?"
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
              <PlusOutlined />
              <Link to="/academic/departments/add">Add Department</Link>
            </span>
          </Button>
        </Col>
      </Row>

      {error && <Message variant="danger">{error}</Message>}
      <Table
        columns={columns}
        dataSource={departments}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default DepartmentList;
