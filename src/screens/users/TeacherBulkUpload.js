import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { bulkCreateTeachers } from "../../features/user/teacherSlice";

function TeacherBulkUpload() {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [notCreatedTeachers, setNotCreatedTeachers] = useState([]);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.getTeachers);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    dispatch(bulkCreateTeachers(file))
      .unwrap()
      .then((response) => {
        setUploadMessage(response.message);
        setNotCreatedTeachers(response.not_created || []);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
      });
  };

  return (
    <Container className="mt-4">
      <Link to={`/users/teachers/`} className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>
      <Card className="shadow">
        <Card.Header className="text-white text-center">
          <h5>Bulk Upload Teachers</h5>
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

          {/* ✅ Display Not Created Teachers If Any */}
          {notCreatedTeachers.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-danger text-white">
                <h6>Failed to Upload {notCreatedTeachers.length} Teachers</h6>
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
                    {notCreatedTeachers.map((teacher, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{teacher.first_name}</td>
                        <td>{teacher.last_name}</td>
                        <td>{teacher.error}</td>
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

export default TeacherBulkUpload;
