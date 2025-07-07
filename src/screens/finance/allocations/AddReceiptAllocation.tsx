import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb, Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { createReceiptAllocation } from "../../../features/finance/allocationSlice";
import Message from "../../../components/Message";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

interface Allocation {
  id: number;
  [key: string]: any;
}

const AddReceiptAllocation: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state: RootState) => state.getAllocations
  );

  const handleSubmit = (values: Allocation) => {
    dispatch(createReceiptAllocation(values))
      .unwrap()
      .then(() => {
        message.success("Receipt Allocation added successfully");
        navigate("/finance/allocations");
      })
      .catch(() => {
        message.error("Failed to add Receipt Allocation");
      });
  };

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/receipt-allocations">Receipt Allocations</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add</Breadcrumb.Item>
      </Breadcrumb>

      {error && <Message variant="danger">{error}</Message>}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Short Name" name="abbr" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          icon={loading ? <Spin indicator={<LoadingOutlined />} /> : null}
        >
          {loading ? "Adding" : "Add Receipt Allocation"}
        </Button>
      </Form>
    </div>
  );
};

export default AddReceiptAllocation;
