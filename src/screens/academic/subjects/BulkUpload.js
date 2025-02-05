import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

import { bulkCreateSubjects } from "../../../features/academic/subjectSlice"; // Import bulkCreateSubjects thunk from the slice

function BulkUpload() {
  const [file, setFile] = useState(null); // Use 'file' to store the uploaded file object
  const [uploadMessage, setUploadMessage] = useState("");
  const [notCreatedSubjects, setNotCreatedSubjects] = useState([]);

  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { loading, error } = useSelector((state) => state.getSubjects); // Assuming the state is in 'getSubjects'

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    dispatch(bulkCreateSubjects(file))
      .unwrap()
      .then((response) => {
        setUploadMessage(response.message);
        setNotCreatedSubjects(response.not_created || []);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
      });
  };

  return (
    <Container className="mt-4">
      <Link to={`/academic/subjects/`} className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>
      <Card className="shadow">
        <Card.Header className="text-white text-center">
          <h5>Bulk Upload Subjects</h5>
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

          {/* ✅ Display Not Created Subjects If Any */}
          {notCreatedSubjects.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-danger text-white">
                <h6>Failed to Upload {notCreatedSubjects.length} Subjects</h6>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subject Name</th>
                      <th>Subject Code</th>
                      <th>Department</th>
                      <th>Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notCreatedSubjects.map((subject, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{subject.name}</td>
                        <td>{subject.subject_code}</td>
                        <td>{subject.department}</td>
                        <td>{subject.error}</td>
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

export default BulkUpload;
