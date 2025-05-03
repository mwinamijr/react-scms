import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

import {
  listReceipts,
  deleteReceipt,
} from "../../features/finance/financeSlice";
import Message from "../../components/Message";

const { RangePicker } = DatePicker;
const { Option } = Select;

function Receipts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.getUsers);
  const { receipts, loading, error } = useSelector((state) => state.getFinance);

  const [filters, setFilters] = useState({
    from_date: null,
    to_date: null,
    class_level: null,
  });

  useEffect(() => {
    dispatch(listReceipts());
  }, [dispatch]);

  const handleFilter = () => {
    const query = {};

    if (filters.from_date) query.from_date = filters.from_date;
    if (filters.to_date) query.to_date = filters.to_date;
    if (filters.class_level) query.class_level = filters.class_level;

    dispatch(listReceipts(query));
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setFilters({
        ...filters,
        from_date: moment(dates[0]).format("YYYY-MM-DD"),
        to_date: moment(dates[1]).format("YYYY-MM-DD"),
      });
    } else {
      setFilters({ ...filters, from_date: null, to_date: null });
    }
  };

  const handleClassChange = (value) => {
    setFilters({ ...filters, class_level: value });
  };

  const columns = [
    {
      title: "Receipt No",
      dataIndex: "receipt_number",
      key: "receipt_number",
    },
    {
      title: "Student",
      dataIndex: "student_details",
      key: "student",
      render: (_, record) => record?.student_details?.full_name,
    },
    {
      title: "Paid For",
      dataIndex: "paid_for_details",
      key: "paid_for",
      render: (_, record) => `${record?.paid_for_details?.name}`,
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
      dataIndex: "received_by_details",
      key: "received_by",
      render: (_, record) =>
        `${record?.received_by_details?.first_name} ${record?.received_by_details?.last_name}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Link to={`/finance/receipts/edit/${record.id}`}>
            <EditOutlined style={{ marginRight: 8 }} />
          </Link>
          <Popconfirm
            title="Delete this receipt?"
            onConfirm={() => handleDelete(record.id)}
            onClick={(e) => e.stopPropagation()}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Handle delete action
  const handleDelete = (id) => {
    dispatch(deleteReceipt(id))
      .unwrap()
      .then(() => message.success("Receipt deleted successfully"));
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Receipts</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        {userInfo.isAccountant || userInfo.isAdmin ? (
          <>
            <h1 className="text-center">Receipts</h1>

            <Link to="/finance/receipts/add" className="btn btn-light my-3">
              Add Receipt
            </Link>

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
}

export default Receipts;
