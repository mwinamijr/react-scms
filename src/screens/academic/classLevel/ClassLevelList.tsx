import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, message, Popconfirm, Space, Col, Row } from "antd";
import { useSelector } from "react-redux";
import {
  listClassLevels,
  deleteClassLevel,
} from "../../../features/academic/classLevelSlice";
import Message from "../../../components/Message";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

// Define ClassLevel type based on your data shape
interface ClassLevel {
  id: number;
  grade_level: string;
  name: string;
}

const ClassLevelList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classLevels, loading, error } = useSelector(
    (state: RootState) => state.getClassLevels
  );

  useEffect(() => {
    dispatch(listClassLevels());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteClassLevel(id))
      .unwrap()
      .then(() => message.success("ClassLevel deleted successfully"))
      .catch((err: string) => message.error(err));
  };

  const columns = [
    { title: "Grade Level", dataIndex: "grade_level", key: "grade_level" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ClassLevel) => (
        <Space size="middle">
          <Link to={`/academic/classLevels/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/academic/classLevels/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this classLevel?"
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
              <Link to="/academic/classLevels/add">Add ClassLevel</Link>
            </span>
          </Button>
        </Col>
      </Row>

      {error && <Message variant="danger">{error}</Message>}
      <Table
        columns={columns}
        dataSource={classLevels}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default ClassLevelList;
