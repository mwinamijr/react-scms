import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, message, Popconfirm, Space } from "antd";
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
} from "@ant-design/icons";

const SubjectList = () => {
  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector(
    (state) => state.getSubjects
  );

  useEffect(() => {
    dispatch(listSubjects());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSubject(id))
      .unwrap()
      .then(() => message.success("Subject deleted successfully"))
      .catch((err) => message.error(err));
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Code", dataIndex: "subject_code", key: "subject_code" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Graded",
      dataIndex: "graded",
      key: "graded",
      render: (graded) => (graded ? "Yes" : "No"),
    },
    {
      title: "Selectable",
      dataIndex: "is_selectable",
      key: "is_selectable",
      render: (selectable) => (selectable ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
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
      <div className="mb-4">
        <Link to="/academic/subjects/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Subject
          </Button>
        </Link>
      </div>
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
