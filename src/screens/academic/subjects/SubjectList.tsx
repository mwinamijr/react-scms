import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, message, Popconfirm, Space, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  listSubjects,
  deleteSubject,
} from "../../../features/academic/subjectSlice";
import Message from "../../../components/Message";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { AppDispatch, RootState } from "../../../app/store";

// Subject Interface
interface Subject {
  id: number;
  name: string;
  subject_code: string;
  department: string;
  graded: boolean;
  is_selectable: boolean;
}

const SubjectList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { subjects, loading, error } = useSelector(
    (state: RootState) => state.getSubjects
  );

  useEffect(() => {
    dispatch(listSubjects());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteSubject(id))
      .unwrap()
      .then(() => message.success("Subject deleted successfully"))
      .catch((err: string) => message.error(err));
  };

  const columns: ColumnsType<Subject> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Code", dataIndex: "subject_code", key: "subject_code" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Graded",
      dataIndex: "graded",
      key: "graded",
      render: (graded: boolean) => (graded ? "Yes" : "No"),
    },
    {
      title: "Selectable",
      dataIndex: "is_selectable",
      key: "is_selectable",
      render: (selectable: boolean) => (selectable ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Subject) => (
        <Space size="middle">
          <Link to={`/academic/subjects/${record.id}`}>
            <EyeOutlined style={{ color: "blue" }} />
          </Link>
          <Link to={`/academic/subjects/${record.id}/edit`}>
            <EditOutlined style={{ color: "green" }} />
          </Link>
          <Popconfirm
            title="Delete this subject?"
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
              <Link to="/academic/subjects/add">Add Subject</Link>
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
              <Link to="/academic/subjects/upload">Bulk Upload</Link>
            </span>
          </Button>
        </Col>
      </Row>

      {error && <Message variant="danger">{error}</Message>}
      <Table
        columns={columns}
        dataSource={subjects}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default SubjectList;
