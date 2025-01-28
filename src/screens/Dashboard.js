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

  // Selectors for fetching data from Redux store
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

  // Dispatch actions to fetch data when the component mounts
  useEffect(() => {
    dispatch(listStudents());
    dispatch(listUsers());
    dispatch(listTeachers());
    dispatch(listAccountants());
    dispatch(listParents());
  }, [dispatch]);

  // Render responsive dashboard cards
  return (
    <div className="dashboard-container">
      <h1 className="mb-4">Dashboard</h1>

      <Row className="gy-4">
        {/* Students Card */}
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/sis/students" className="text-decoration-none">
                Students
              </Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3 className="display-4">{studentPagination.count || 0}</h3>
            </Card.Body>
          </Card>
        </Col>

        {/* Teachers Card */}
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users/teachers" className="text-decoration-none">
                Teachers
              </Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3 className="display-4">{teachers.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        {/* Parents Card */}
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users/parents" className="text-decoration-none">
                Parents
              </Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3 className="display-4">{parentPagination.count || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="gy-4 mt-4">
        {/* Accountants Card */}
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users/accountants" className="text-decoration-none">
                Accountants
              </Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3 className="display-4">{accountants.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        {/* Users Card */}
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <Link to="/users" className="text-decoration-none">
                Users
              </Link>
            </Card.Header>
            <Card.Body className="text-center">
              <h3 className="display-4">{userPagination.count || 0}</h3>
            </Card.Body>
            <Card.Footer className="text-center">
              <Link to="/users/add" className="btn btn-dark w-100">
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
