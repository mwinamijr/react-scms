import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Row,
  Col,
  Button,
  message,
  Space,
  Popconfirm,
  Typography,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Message from "../../../components/Message";
import {
  deletePaymentAllocation,
  deleteReceiptAllocation,
  listPaymentAllocations,
  listReceiptAllocations,
} from "../../../features/finance/allocationSlice";

const { Title } = Typography;

const Allocation = () => {
  const dispatch = useDispatch();

  const { loading, error, receiptAllocations, paymentAllocations } =
    useSelector((state) => state.getAllocations);

  useEffect(() => {
    dispatch(listPaymentAllocations());
    dispatch(listReceiptAllocations());
  }, [dispatch]);

  const handlePaymentAllocationDelete = (id) => {
    dispatch(deletePaymentAllocation(id))
      .unwrap()
      .then(() => message.success("Payment allocation deleted successfully"));
  };

  const handleReceiptAllocationDelete = (id) => {
    dispatch(deleteReceiptAllocation(id))
      .unwrap()
      .then(() => message.success("Allocation deleted successfully"));
  };

  const columns = (type) => [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Short Name",
      dataIndex: "abbr",
      key: "abbr",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/finance/allocations/${type}/${record.id}`}>
            <EyeOutlined style={{ color: "#1890ff" }} />
          </Link>
          <Link to={`/finance/allocations/${type}/${record.id}/edit`}>
            <EditOutlined style={{ color: "#52c41a" }} />
          </Link>
          <Popconfirm
            title={`Delete this ${type.replace("-", " ")}?`}
            onConfirm={() =>
              type === "payment-allocations"
                ? handlePaymentAllocationDelete(record.id)
                : handleReceiptAllocationDelete(record.id)
            }
          >
            <DeleteOutlined style={{ color: "#ff4d4f", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/dashboard">Dashboard</Link> },
          { title: "Allocations" },
        ]}
      />

      <Row gutter={24}>
        {[
          {
            title: "Receipt Allocation",
            data: receiptAllocations,
            type: "receipt-allocations",
          },
          {
            title: "Payment Allocation",
            data: paymentAllocations,
            type: "payment-allocations",
          },
        ].map(({ title, data, type }) => (
          <Col xs={24} lg={12} key={type}>
            <Title level={2} style={{ textAlign: "center", marginBottom: 16 }}>
              {title}
            </Title>

            <Row justify="end" style={{ marginBottom: 16 }}>
              <Button type="primary">
                <Link to={`/finance/allocations/${type}/add`}>
                  <PlusOutlined /> Add {title}
                </Link>
              </Button>
            </Row>

            {error && <Message variant="danger">{error}</Message>}

            <Table
              dataSource={data}
              columns={columns(type)}
              rowKey="id"
              bordered
              pagination={{ pageSize: 10 }}
              loading={loading}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Allocation;
