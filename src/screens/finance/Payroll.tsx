import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Breadcrumb, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { listTeachers } from "../../features/user/teacherSlice";
import { listAccountants } from "../../features/user/accountantSlice";

interface Employee {
  id: number;
  empId: string;
  user: string;
  tin_number: string;
  nssf_number: string;
  salary: number;
}

const Payroll: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userInfo } = useSelector((state: RootState) => state.getUsers);

  const {
    loading: teacherLoading,
    error: teacherError,
    teachers,
  } = useSelector((state: RootState) => state.getTeachers);

  const {
    loading: accountantLoading,
    error: accountantError,
    accountants,
  } = useSelector((state: RootState) => state.getAccountants);

  useEffect(() => {
    dispatch(listTeachers({}));
    dispatch(listAccountants());
  }, [dispatch]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Payroll</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        {userInfo?.isAccountant || userInfo?.isAdmin ? (
          <div>
            <h1 className="text-center">Payroll</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Emp Id</th>
                  <th>Full Name</th>
                  <th>TIN Number</th>
                  <th>NSSF Number</th>
                  <th>Salary</th>
                  <th>NSSF cut</th>
                </tr>
              </thead>

              {teacherLoading ? (
                <Loader />
              ) : teacherError ? (
                <Message variant="danger">{teacherError}</Message>
              ) : (
                <tbody>
                  {teachers?.map((teacher: Employee) => (
                    <tr key={teacher.id}>
                      <td>{teacher.empId}</td>
                      <td>{teacher.user}</td>
                      <td>{teacher.tin_number}</td>
                      <td>{teacher.nssf_number}</td>
                      <td>{teacher.salary}</td>
                      <td>{(teacher.salary * 0.1).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              )}

              {accountantLoading ? (
                <Loader />
              ) : accountantError ? (
                <Message variant="danger">{accountantError}</Message>
              ) : (
                <tbody>
                  {accountants?.map((accountant: Employee) => (
                    <tr key={accountant.id}>
                      <td>{accountant.empId}</td>
                      <td>{accountant.user}</td>
                      <td>{accountant.tin_number}</td>
                      <td>{accountant.nssf_number}</td>
                      <td>{accountant.salary}</td>
                      <td>{(accountant.salary * 0.1).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
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
};

export default Payroll;
