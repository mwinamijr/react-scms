import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb, Form, Input, Button, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  updateReceiptAllocation,
  receiptAllocationDetails,
} from "../../../features/finance/allocationSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

const UpdateReceiptAllocation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { receiptAllocation, loading, error } = useSelector(
    (state: RootState) => state.getAllocations
  );

  useEffect(() => {
    dispatch(receiptAllocationDetails(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (receiptAllocation) form.setFieldsValue(receiptAllocation);
  }, [receiptAllocation, form]);

  const handleSubmit = (values: { name: string; abbr: string }) => {
    dispatch(
      updateReceiptAllocation({
        id: Number(id),
        receiptAllocationData: { ...values, id: Number(id) },
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
          <Link to="/finance/receipt-allocations">Receipt Allocations</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update</Breadcrumb.Item>
      </Breadcrumb>

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
