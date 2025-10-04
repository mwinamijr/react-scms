import React from "react";
import { Form, Input, Button, Card, message, Checkbox } from "antd";
import { useSelector } from "react-redux";
import { createSubject } from "../../../features/academic/subjectSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

// Subject form value types
interface SubjectFormValues {
  name: string;
  subject_code: string;
  department: number;
  graded: boolean;
  is_selectable: boolean;
  description?: string;
}

const AddSubject: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loadingCreate } = useSelector(
    (state: RootState) => state.getSubjects
  );

  const onFinish = (values: SubjectFormValues) => {
    dispatch(createSubject(values)).then(() => {
      message.success("Subject created successfully!");
      navigate("/academic/subjects");
    });
  };

  return (
    <Card title="Add Subject">
      <Form<SubjectFormValues> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Enter subject name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Code"
          name="subject_code"
          rules={[{ required: true, message: "Enter subject code" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Enter department ID" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item name="graded" valuePropName="checked" initialValue={false}>
          <Checkbox>Graded</Checkbox>
        </Form.Item>

        <Form.Item
          name="is_selectable"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Selectable</Checkbox>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loadingCreate}>
          Add Subject
        </Button>
      </Form>
    </Card>
  );
};

export default AddSubject;
