import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, Table } from "react-bootstrap";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { listReceipts } from "../../features/finance/financeSlice"; // Update to import from financeSlice
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function Receipts() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.getUsers);

  // Access state from the finance slice
  const { receiptList, loading, error } = useSelector((state) => state.finance);

  useEffect(() => {
    dispatch(listReceipts());
  }, [dispatch]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Receipts</Breadcrumb.Item>
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
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Receipt No</th>
                    <th>Student</th>
                    <th>Paid for</th>
                    <th>Amount</th>
                    <th>Received by</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptList.map((receipt) => (
                    <tr key={receipt.receipt_no}>
                      <td>{receipt.receipt_no}</td>
                      <td>{receipt.student}</td>
                      <td>{receipt.paid_for}</td>
                      <td>{receipt.amount}</td>
                      <td>{receipt.received_by}</td>
                      <td>
                        <Link to={`/finance/receipts/${receipt.id}`}>
                          <EyeOutlined />
                        </Link>
                        <span> </span>
                        <Link to={`/finance/receipts/${receipt.id}`}>
                          <EditOutlined />
                        </Link>
                        <span> </span>
                        <DeleteOutlined />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        ) : (
          <Message>
            You are not authorized to view this page. Please contact the Admin
            for further details
          </Message>
        )}
      </div>
    </div>
  );
}

export default Receipts;
