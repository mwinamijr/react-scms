import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table } from "react-bootstrap";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { listAccountants } from "../../features/user/accountantSlice"; // Import the thunk action from the slice
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function AccountantList() {
  const dispatch = useDispatch();

  const { loading, error, accountantList } = useSelector(
    (state) => state.accountant
  );

  useEffect(() => {
    dispatch(listAccountants()); // Dispatch the action from the accountantSlice
  }, [dispatch]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Accountants</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        <h1 className="text-center">Accountants</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Emp Id</th>
                <th>Full Name</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accountantList.map((accountant) => (
                <tr key={accountant.id}>
                  <td>{accountant.empId}</td>
                  <td>
                    {accountant.user.first_name} {accountant.user.last_name}
                  </td>
                  <td>{accountant.salary}</td>
                  <td>
                    <Link to={`/users/accountants/${accountant.id}`}>
                      <EyeOutlined />
                    </Link>
                    <span> </span>
                    <Link to={`/users/accountants/${accountant.id}`}>
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
    </div>
  );
}

export default AccountantList;
