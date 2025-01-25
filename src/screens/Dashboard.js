import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";

import { listStudents } from "../features/students/studentSlice";
import { listUsers } from "../features/user/userSlice";
import { listTeachers } from "../features/user/teacherSlice";
import { listAccountants } from "../features/user/accountantSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { students = [] } = useSelector((state) => state.getStudents || {});
  const { users = [] } = useSelector((state) => state.user || {});
  const { teachers = [] } = useSelector((state) => state.teacher || {});
  const { accountants = [] } = useSelector((state) => state.accountant || {});

  useEffect(() => {
    dispatch(listStudents());
    dispatch(listUsers());
    dispatch(listTeachers());
    dispatch(listAccountants());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Link to="/sis/students">Students</Link>
            </Card.Header>
            <Card.Body>{students.length}</Card.Body>
            <Card.Footer>
              <Link to="/sis/students/add" className="btn btn-light my-3">
                Add Student
              </Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Link to="/users/teachers">Teachers</Link>
            </Card.Header>
            <Card.Body>{teachers.length}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Link to="/users/accountants">Accountants</Link>
            </Card.Header>
            <Card.Body>{accountants.length}</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Link to="/users">Users</Link>
            </Card.Header>
            <Card.Body>{users.length}</Card.Body>
            <Card.Footer>
              <Link to="/users/add" className="btn btn-dark my-3">
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
