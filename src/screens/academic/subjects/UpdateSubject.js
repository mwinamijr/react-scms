import React, { useEffect } from "react";
import { Form, Input, Button, Card, message, Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubjectDetails,
  updateSubject,
} from "../../../features/academic/subjectSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateSubject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subject, loading } = useSelector((state) => state.getSubjects);

  useEffect(() => {
    dispatch(getSubjectDetails(id));
  }, [dispatch, id]);

  const onFinish = (values) => {
    dispatch(updateSubject({ id, ...values })).then(() => {
      message.success("Subject updated successfully!");
      navigate("/academic/subjects");
    });
  };

  return (
    <div>
      <Link to={`/academic/subjects/${id}`}>
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to {subject.name}
        </Button>
      </Link>
      <Card title="Update Subject" className="mt-4" loading={loading}>
        <Form layout="vertical" onFinish={onFinish} initialValues={subject}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Code"
            name="subject_code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="graded" valuePropName="checked">
            <Checkbox>Graded</Checkbox>
          </Form.Item>
          <Form.Item name="is_selectable" valuePropName="checked">
            <Checkbox>Selectable</Checkbox>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Subject
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateSubject;
