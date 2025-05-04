import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Form,
  Button,
  Container,
  Table,
  ProgressBar,
} from "react-bootstrap";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { bulkCreateStudents } from "../../features/students/studentSlice";

function StudentBulkUpload() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const {
    loading,
    uploadMessage,
    errorMessage,
    notCreatedStudents,
    updatedStudents,
    skippedStudents,
    uploadProgress,
  } = useSelector((state) => state.getStudents);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
    dispatch(bulkCreateStudents(file));
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
        <Card.Header className="text-white text-center bg-primary">
          <h5>Bulk Upload Students</h5>
        </Card.Header>
        <Card.Body>
          {errorMessage && <Message variant="danger">{errorMessage}</Message>}
          {uploadMessage && (
            <Message variant="success">{uploadMessage}</Message>
          )}

          {updatedStudents.length > 0 ? (
            <Message variant="success">
              {updatedStudents.length} students was updated
            </Message>
          ) : (
            <Message variant="success">No students was updated</Message>
          )}

          {loading && (
            <ProgressBar
              now={uploadProgress}
              label={`${uploadProgress}%`}
              animated
              striped
              className="mb-3"
            />
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
              <Button
                variant="primary"
                type="submit"
                className="w-50"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </Form>

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

          {updatedStudents.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-success text-white">
                <h6>{updatedStudents.length} Students were updated.</h6>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Admission Number</th>
                      <th>Full Name</th>
                      <th>Reason(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {updatedStudents.map((student, index) => (
                      <tr key={index}>
                        <td>{student.admission_number}</td>
                        <td>{student.full_name}</td>
                        <td>{student.reasons}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          {skippedStudents.length > 0 && (
            <Card className="mt-4">
              <Card.Header className="bg-warning text-white">
                <h6>
                  {skippedStudents.length} Students were <b>NOT</b> updated.
                </h6>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Admission Number</th>
                      <th>Full Name</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skippedStudents.map((student, index) => (
                      <tr key={index}>
                        <td>{student.admission_number}</td>
                        <td>{student.full_name}</td>
                        <td>{student.reason}</td>
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
