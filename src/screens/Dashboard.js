import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";

import { listStudents } from "../features/students/studentSlice";
import { listUsers } from "../features/user/userSlice";
import { listTeachers } from "../features/user/teacherSlice";
import { listAccountants } from "../features/user/accountantSlice";
import { listParents } from "../features/user/parentSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { pagination: studentPagination = {} } = useSelector(
    (state) => state.getStudents || {}
  );
  const { pagination: userPagination = {} } = useSelector(
    (state) => state.getUsers || {}
  );
  const { pagination: parentPagination = {} } = useSelector(
    (state) => state.getParents || {}
  );
  const { teachers = [] } = useSelector((state) => state.teacher || {});
  const { accountants = [] } = useSelector((state) => state.accountant || {});

  useEffect(() => {
    dispatch(listStudents());
    dispatch(listUsers());
    dispatch(listTeachers());
    dispatch(listAccountants());
    dispatch(listParents());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <Row className="gy-4">
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/sis/students">Students</Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3>{studentPagination.count || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users/teachers">Teachers</Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3>{teachers.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users/parents">Parents</Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3>{parentPagination.count || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="gy-4 mt-4">
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users/accountants">Accountants</Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3>{accountants.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users">Users</Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3>{userPagination.count || 0}</h3>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/users/add" className="btn btn-dark">
                Add User
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
