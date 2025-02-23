import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Card, Typography } from "antd";
import { receiptAllocationDetails } from "../../../features/finance/allocationSlice";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

const { Title, Text } = Typography;

const ReceiptAllocationDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { receiptAllocation, loading, error } = useSelector(
    (state) => state.getAllocations
  );

  useEffect(() => {
    dispatch(receiptAllocationDetails(id));
  }, [dispatch, id]);

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
          { title: "Details" },
        ]}
      />

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Card title="Receipt Allocation Details" bordered>
        <Title level={4}>{receiptAllocation?.name}</Title>
        <Text>Short Name: {receiptAllocation?.abbr}</Text>
      </Card>
    </div>
  );
};

export default ReceiptAllocationDetails;
