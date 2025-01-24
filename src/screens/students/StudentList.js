import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Table, Row, Col } from "react-bootstrap";
import { EditOutlined } from "@ant-design/icons";

import { listStudents } from "../../features/students/studentSlice"; // Import the listStudents thunk
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";

function Students() {
  const dispatch = useDispatch();

  // Access student state from Redux store using the slice
  const { loading, error, studentList } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(listStudents()); // Dispatch the listStudents thunk to fetch student data
  }, [dispatch]);

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
              {studentList.map((student) => (
                <tr key={student.addmission_number}>
                  <td>{student.addmission_number}</td>
                  <td>
                    {student.first_name} {student.middle_name}{" "}
                    {student.last_name}
                  </td>
                  <td>{student.gender}</td>
                  <td>{student.class_level}</td>
                  <td>{student.birthday}</td>
                  <td>
                    <Link to={`/sis/students/${student.addmission_number}`}>
                      <EditOutlined />
                    </Link>
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

export default Students;
