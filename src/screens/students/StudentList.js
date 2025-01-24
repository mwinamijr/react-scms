import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Row, Col, Button } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";

import { listStudents } from "../../features/students/studentSlice";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";

function Students() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Track current page for pagination

  // Access student state from Redux store
  const { loading, error, students, pagination } = useSelector(
    (state) => state.student
  );
  console.log(students);
  console.log(pagination);

  useEffect(() => {
    dispatch(listStudents({ page: currentPage })); // Fetch student data for the current page
  }, [dispatch, currentPage]);

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
        <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
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
                      <Link to={`/sis/students/${student.addmission_number}`}>
                        <EditOutlined />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between">
              <Button
                variant="light"
                onClick={handlePreviousPage}
                disabled={!pagination.previous}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(pagination.count / students.length)}
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
