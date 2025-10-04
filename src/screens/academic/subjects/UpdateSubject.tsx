import React, { useEffect } from "react";
import { Form, Input, Button, Card, message, Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  getSubjectDetails,
  updateSubject,
} from "../../../features/academic/subjectSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

interface Subject {
  id: number;
  name: string;
  subject_code: string;
  department: string | number;
  graded: boolean;
  is_selectable: boolean;
  description?: string;
}

const UpdateSubject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { subject, loading } = useSelector(
    (state: RootState) =>
      state.getSubjects as { subject: Subject | null; loading: boolean }
  );

  useEffect(() => {
    if (id) {
      dispatch(getSubjectDetails(Number(id)));
    }
  }, [dispatch, id]);

  const onFinish = (values: Partial<Subject>) => {
    if (id) {
      dispatch(updateSubject({ id: Number(id), ...values }))
        .unwrap()
        .then(() => {
          message.success("Subject updated successfully!");
          navigate("/academic/subjects");
        })
        .catch((err: string) => {
          message.error(err || "Failed to update subject");
        });
    }
  };

  return (
    <div>
      <Link to={`/academic/subjects/${id}`}>
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to {subject?.name || "Subject"}
        </Button>
      </Link>
      <Card title="Update Subject" className="mt-4" loading={loading}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={subject || {}}
          key={subject?.id} // force reset form if subject changes
        >
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
