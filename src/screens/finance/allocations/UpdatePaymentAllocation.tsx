import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb, Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  updatePaymentAllocation,
  paymentAllocationDetails,
} from "../../../features/finance/allocationSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

const UpdatePaymentAllocation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { paymentAllocation, loading, error } = useSelector(
    (state: RootState) => state.getAllocations
  );

  useEffect(() => {
    if (id) {
      dispatch(paymentAllocationDetails(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (paymentAllocation) {
      form.setFieldsValue(paymentAllocation);
    }
  }, [paymentAllocation, form]);

  const handleSubmit = (values: { name: string; abbr: string }) => {
    if (!id) return;
    console.log("Submitting values:", values);
    dispatch(
      updatePaymentAllocation({
        id: Number(id),
        paymentAllocationData: { ...values, id: Number(id) },
      })
    )
      .unwrap()
      .then(() => {
        message.success("Updated successfully");
        navigate("/finance/allocations");
      });
  };

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/payment-allocations">Payment Allocations</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {!loading && !error && (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Short Name"
            name="abbr"
            rules={[{ required: true, message: "Please enter a short name" }]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            icon={loading ? <Spin indicator={<LoadingOutlined />} /> : null}
          >
            {loading ? "Updating ...." : "Update Payment Allocation"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UpdatePaymentAllocation;
