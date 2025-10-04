import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { createDepartment } from "../../../features/academic/departmentSlice";
import { useNavigate, Link } from "react-router-dom";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

const AddDepartment: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loadingCreate } = useSelector(
    (state: RootState) => state.getDepartments
  );

  const onFinish = (values: { name: string; order_rank: number }) => {
    dispatch(createDepartment(values)).then(() => {
      message.success("Department created successfully!");
      navigate("/academic/departments");
    });
  };

  return (
    <div>
      <Link to="/academic/departments">
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to Departments
        </Button>
      </Link>

      <Card title="Add Department" className="mt-4">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Enter department name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Order"
            name="order_rank"
            rules={[{ required: true, message: "Enter department rank" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loadingCreate}>
            Add Department
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddDepartment;
