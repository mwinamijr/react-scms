import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Table,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Space,
  message,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { Moment } from "moment";
import type { ColumnsType } from "antd/es/table";

import {
  listReceipts,
  deleteReceipt,
} from "../../features/finance/receiptSlice";
import Message from "../../components/Message";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

const { RangePicker } = DatePicker;
const { Option } = Select;

interface StudentDetails {
  full_name: string;
}

interface PaidForDetails {
  name: string;
}

interface ReceivedByDetails {
  first_name: string;
  last_name: string;
}

interface Receipt {
  id: number;
  receipt_number: string;
  student_details?: StudentDetails;
  paid_for_details?: PaidForDetails;
  paid_through: string;
  amount: number;
  received_by_details?: ReceivedByDetails;
}

interface Filters {
  from_date: string | null;
  to_date: string | null;
  class_level: string | null;
}

const Receipts: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.getUsers);
  const { receipts, loading, error } = useSelector(
    (state: RootState) => state.getReceipts
  );
  console.log("Receipts:", receipts);

  const [filters, setFilters] = useState<Filters>({
    from_date: null,
    to_date: null,
    class_level: null,
  });

  useEffect(() => {
    dispatch(listReceipts({}));
  }, [dispatch]);

  const handleFilter = () => {
    const query: any = {};
    if (filters.from_date) query.from_date = filters.from_date;
    if (filters.to_date) query.to_date = filters.to_date;
    if (filters.class_level) query.class_level = filters.class_level;

    dispatch(listReceipts(query));
  };

  const handleDateChange = (dates: [Moment, Moment] | null) => {
    if (dates && dates.length === 2) {
      setFilters({
        ...filters,
        from_date: dates[0].format("YYYY-MM-DD"),
        to_date: dates[1].format("YYYY-MM-DD"),
      });
    } else {
      setFilters({ ...filters, from_date: null, to_date: null });
    }
  };

  const handleClassChange = (value: string) => {
    setFilters({ ...filters, class_level: value });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteReceipt(id))
      .unwrap()
      .then(() => message.success("Receipt deleted successfully"))
      .catch(() => message.error("Failed to delete receipt"));
  };

  const columns: ColumnsType<Receipt> = [
    {
      title: "Receipt No",
      dataIndex: "receipt_number",
      key: "receipt_number",
    },
    {
      title: "Student",
      key: "student",
      render: (_, record) => record.student_details?.full_name || "-",
    },
    {
      title: "Paid For",
      key: "paid_for",
      render: (_, record) => record.paid_for_details?.name || "-",
    },
    {
      title: "Through",
      dataIndex: "paid_through",
      key: "paid_through",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Received By",
      key: "received_by",
      render: (_, record) =>
        record.received_by_details
          ? `${record.received_by_details.first_name} ${record.received_by_details.last_name}`
          : "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Link to={`/finance/receipts/edit/${record.id}`}>
            <EditOutlined style={{ marginRight: 8 }} />
          </Link>
          <Popconfirm
            title="Delete this receipt?"
            onConfirm={() => handleDelete(record.id)}
          >
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Receipts</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        {userInfo?.isAccountant || userInfo?.isAdmin ? (
          <>
            <h1 className="text-center">Receipts</h1>

            <Row
              gutter={[16, 16]}
              className="mb-4"
              align="middle"
              justify="start"
            >
              <Col xs={24} sm={12} lg={6}>
                <Button type="default" block>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <PlusOutlined />
                    <Link to="/finance/receipts/add">Add Receipt</Link>
                  </span>
                </Button>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Button type="default" block>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <UploadOutlined />
                    <Link to="/finance/receipts/upload">Bulk Upload</Link>
                  </span>
                </Button>
              </Col>
            </Row>

            <Row gutter={16} className="mb-4">
              <Col xs={24} md={8}>
                <RangePicker
                  onChange={handleDateChange}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={24} md={8}>
                <Select
                  placeholder="Select Class Level"
                  onChange={handleClassChange}
                  allowClear
                  style={{ width: "100%" }}
                >
                  <Option value="Form One">Form One</Option>
                  <Option value="Form Two">Form Two</Option>
                  <Option value="Form Three">Form Three</Option>
                  <Option value="Form Four">Form Four</Option>
                </Select>
              </Col>
              <Col xs={24} md={8}>
                <Button type="primary" onClick={handleFilter} block>
                  Apply Filters
                </Button>
              </Col>
            </Row>

            {error && <Message variant="danger">{error}</Message>}

            <Table
              columns={columns}
              dataSource={receipts}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
              onRow={(record) => ({
                onClick: () => navigate(`/finance/receipts/${record.id}`),
                style: { cursor: "pointer" },
              })}
            />
          </>
        ) : (
          <Message>
            You are not authorized to view this page. Please contact the Admin
            for further details.
          </Message>
        )}
      </div>
    </div>
  );
};

export default Receipts;
