import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb, Card, Typography } from "antd";
import { receiptAllocationDetails } from "../../../features/finance/allocationSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import type { RootState } from "../../../app/store"; // adjust path as needed
import { useAppDispatch } from "../../../app/hooks";

const { Title, Text } = Typography;

const PaymentAllocationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { receiptAllocation, loading, error } = useSelector(
    (state: RootState) => state.getAllocations
  );

  useEffect(() => {
    if (id) {
      dispatch(receiptAllocationDetails(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/payment-allocations">Payment Allocations</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Details</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {!loading && !error && receiptAllocation && (
        <Card title="Payment Allocation Details" bordered>
          <Title level={4}>{receiptAllocation.name}</Title>
          <Text>Short Name: {receiptAllocation.abbr}</Text>
        </Card>
      )}
    </div>
  );
};

export default PaymentAllocationDetails;
