import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Container, Table } from "react-bootstrap";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { bulkCreateStudents } from "../../features/students/studentSlice";

function StudentBulkUpload() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [notCreatedStudents, setNotCreatedStudents] = useState([]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getStudents);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    dispatch(bulkCreateStudents(file))
      .unwrap()
      .then((response) => {
        setUploadMessage(response.message);
        setNotCreatedStudents(response.not_created || []);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
      });
  };

  return (
    <Container className="mt-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/sis/students/">Students</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Upload Students</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="shadow">
        <Card.Header className="text-white text-center">
          <h5>Bulk Upload Students</h5>
        </Card.Header>
        <Card.Body>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          {uploadMessage && (
            <Message variant="success">{uploadMessage}</Message>
          )}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="bulkUpload" className="mb-3">
              <Form.Label>Choose Excel File to Upload</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".xlsx, .xls"
                required
              />
              <Form.Text className="text-muted">
                Only Excel files (.xls, .xlsx) are supported.
              </Form.Text>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="w-50">
                Upload
              </Button>
            </div>
          </Form>

          {/* ✅ Display Not Created Students If Any */}
          {notCreatedStudents.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-danger text-white">
                <h6>Failed to Upload {notCreatedStudents.length} Students</h6>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notCreatedStudents.map((student, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.first_name}</td>
                        <td>{student.last_name}</td>
                        <td>{student.error}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentBulkUpload;
