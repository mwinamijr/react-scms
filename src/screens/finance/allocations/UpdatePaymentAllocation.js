import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  updatePaymentAllocation,
  paymentAllocationDetails,
} from "../../../features/finance/allocationSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const UpdatePaymentAllocation = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentAllocation, loading, error } = useSelector(
    (state) => state.getAllocations
  );

  useEffect(() => {
    dispatch(paymentAllocationDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (paymentAllocation) form.setFieldsValue(paymentAllocation);
  }, [paymentAllocation, form]);

  const handleSubmit = (values) => {
    dispatch(updatePaymentAllocation({ id, ...values }))
      .unwrap()
      .then(() => {
        message.success("Updated successfully");
        navigate("/finance/allocations");
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
              <Link to="/finance/payment-allocations">Payment Allocations</Link>
            ),
          },
          { title: "Update" },
        ]}
      />

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Short Name" name="abbr">
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
    </div>
  );
};

export default UpdatePaymentAllocation;
