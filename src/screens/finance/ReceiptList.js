import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, Table } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { listReceipts } from "../../features/finance/financeSlice"; // Updated import
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function Receipts() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.getUsers);

  // Access state from the finance slice
  const { receipts, loading, error } = useSelector((state) => state.getFinance);

  useEffect(() => {
    dispatch(listReceipts());
  }, [dispatch]);

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
      render: (_, record) =>
        `${record?.student_details?.first_name} ${record?.student_details?.last_name}`,
    },
    {
      title: "Paid For",
      dataIndex: "paid_for_details",
      key: "paid_for",
      render: (_, record) => `${record?.paid_for_details?.name}`,
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
        <span>
          <Link to={`/finance/receipts/${record.id}`}>
            <EyeOutlined style={{ marginRight: 8 }} />
          </Link>
          <Link to={`/finance/receipts/edit/${record.id}`}>
            <EditOutlined style={{ marginRight: 8 }} />
          </Link>
          <DeleteOutlined style={{ color: "red" }} />
        </span>
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
        {userInfo.isAccountant || userInfo.isAdmin ? (
          <div>
            <h1 className="text-center">Receipts</h1>
            <Link to="/finance/receipts/add" className="btn btn-light my-3">
              Add Receipt
            </Link>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table
                columns={columns}
                dataSource={receipts}
                rowKey="receipt_no"
                pagination={{ pageSize: 10 }}
              />
            )}
          </div>
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
