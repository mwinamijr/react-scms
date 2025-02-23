import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  updateReceiptAllocation,
  receiptAllocationDetails,
} from "../../../features/finance/allocationSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const UpdateReceiptAllocation = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { receiptAllocation, loading, error } = useSelector(
    (state) => state.getAllocations
  );

  useEffect(() => {
    dispatch(receiptAllocationDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (receiptAllocation) form.setFieldsValue(receiptAllocation);
  }, [receiptAllocation, form]);

  const handleSubmit = (values) => {
    dispatch(updateReceiptAllocation({ id, ...values }))
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
              <Link to="/finance/receipt-allocations">Receipt Allocations</Link>
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
          {loading ? "Updating ...." : "Update Receipt Allocation"}
        </Button>
      </Form>
    </div>
  );
};

export default UpdateReceiptAllocation;
