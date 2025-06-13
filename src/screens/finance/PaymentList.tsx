import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, Table } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { listPayments } from "../../features/finance/financeSlice";
import Message from "../../components/Message";
import type { RootState } from "../../app/store"; // Replace with your actual store type paths
import { useAppDispatch } from "../../app/hooks";

interface User {
  first_name: string;
  last_name: string;
}

interface PaidFor {
  name: string;
}

interface Payment {
  id: number;
  payment_number: string;
  paid_to: string;
  paid_for: PaidFor;
  paid_through: string;
  amount: number;
  paid_by: User;
}

const Payments: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userInfo } = useSelector((state: RootState) => state.getUsers);

  const { loading, error, payments } = useSelector(
    (state: RootState) => state.getFinance
  );

  useEffect(() => {
    dispatch(listPayments());
  }, [dispatch]);

  const columns: ColumnsType<Payment> = [
    {
      title: "Payment id",
      dataIndex: "payment_number",
      key: "payment_number",
    },
    {
      title: "Paid to",
      dataIndex: "paid_to",
      key: "paid_to",
    },
    {
      title: "Paid For",
      dataIndex: "paid_for",
      key: "paid_for",
      render: (_, record) => record?.paid_for?.name,
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
      title: "Paid By",
      dataIndex: "paid_by",
      key: "paid_by",
      render: (_, record) =>
        `${record?.paid_by?.first_name} ${record?.paid_by?.last_name}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Link to={`/finance/payments/${record.id}`}>
            <EyeOutlined style={{ marginRight: 8 }} />
          </Link>
          <Link to={`/finance/payments/edit/${record.id}`}>
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
        <Breadcrumb.Item>Payments</Breadcrumb.Item>
      </Breadcrumb>

      {userInfo?.isAccountant || userInfo?.isAdmin ? (
        <div>
          <h1 className="text-center">Payments</h1>
          <Link to="/finance/payments/add" className="btn btn-light my-3">
            Add Payment
          </Link>
          {error && <Message variant="danger">{error}</Message>}

          <Table
            columns={columns}
            dataSource={payments}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            loading={loading}
          />
        </div>
      ) : (
        <Message>
          You are not authorized to view this page. Please contact the Admin for
          further details.
        </Message>
      )}
    </div>
  );
};

export default Payments;
