import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { createPaymentAllocation } from "../../../features/finance/allocationSlice";
import Message from "../../../components/Message";

const AddPaymentAllocation = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.getAllocations);

  const handleSubmit = (values) => {
    dispatch(createPaymentAllocation(values))
      .unwrap()
      .then(() => {
        message.success("Payment Allocation added successfully");
        navigate("/finance/allocations/");
      });
  };

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Dashboard</Link> },
          {
            title: (
              <Link to="/finance/allocations/payment-allocations">
                Payment Allocations
              </Link>
            ),
          },
          { title: "Add" },
        ]}
      />
      {error && <Message variant="danger">{error}</Message>}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Short Name"
          name="short_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          icon={loading ? <Spin indicator={<LoadingOutlined />} /> : null}
        >
          {loading ? "Adding" : "Add Payment Allocation"}
        </Button>
      </Form>
    </div>
  );
};

export default AddPaymentAllocation;
