import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Row, Col, Form, Button } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";

import { listStudents } from "../../features/students/studentSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function Students() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [filters, setFilters] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    class_level: "",
  });

  // Access student state from Redux store
  const { loading, error, students, pagination } = useSelector(
    (state) => state.getStudents
  );

  useEffect(() => {
    dispatch(listStudents({ ...filters, page: currentPage })); // Fetch students based on filters and current page
  }, [dispatch, filters, currentPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search
    dispatch(listStudents({ ...filters, page: 1 }));
  };

  // Handlers for pagination
  const handleNextPage = () => {
    if (pagination.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.previous) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Students</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h1 className="text-center">Students</h1>
        <Row>
          <Col>
            <Link to="/sis/students/add" className="btn btn-light my-3">
              Add Student
            </Link>
          </Col>
          <Col>
            <Link to="/sis/students/upload" className="btn btn-light my-3">
              Bulk Upload Students
            </Link>
          </Col>
        </Row>

        <Form onSubmit={handleSearch} className="mb-3">
          <Row>
            <Col md={3}>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="First Name"
                value={filters.first_name}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="middle_name"
                placeholder="Middle Name"
                value={filters.middle_name}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={filters.last_name}
                onChange={handleInputChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                name="class_level"
                placeholder="Class Level"
                value={filters.class_level}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Button type="submit" variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Adm No:</th>
                  <th>Full Name</th>
                  <th>Sex</th>
                  <th>Class</th>
                  <th>Birthday</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.admission_number}</td>
                    <td>
                      {student.first_name} {student.middle_name}{" "}
                      {student.last_name}
                    </td>
                    <td>{student.gender}</td>
                    <td>{student.class_level}</td>
                    <td>{student.date_of_birth}</td>
                    <td>
                      <Link to={`/sis/students/${student.admission_number}`}>
                        <EditOutlined />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button
                variant="light"
                onClick={handlePreviousPage}
                disabled={!pagination.previous}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {Math.ceil(pagination.count / 30)}{" "}
                {/* Assuming default page size is 30 */}
              </span>
              <Button
                variant="light"
                onClick={handleNextPage}
                disabled={!pagination.next}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;
