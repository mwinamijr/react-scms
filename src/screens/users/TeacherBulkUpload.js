import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { bulkCreateTeachers } from "../../features/user/teacherSlice"; // Import bulkCreateTeachers thunk from the slice

function TeacherBulkUpload() {
  const [file, setFile] = useState(null); // Use 'file' to store the uploaded file object

  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { loading, error, bulkCreated } = useSelector(
    (state) => state.getTeachers
  ); // Assuming the state is in 'getTeachers'

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch the bulkCreateTeachers thunk with the selected file
    if (file) {
      if (!file) {
        alert("Please select a file before uploading.");
        return;
      }

      dispatch(bulkCreateTeachers(file));
    }
  };
  return (
    <Container className="mt-4">
      <Link to={`/users/teachers/`} className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>
      <Card className="shadow">
        <Card.Header className=" text-white text-center">
          <h5>Bulk Upload Teachers</h5>
        </Card.Header>
        <Card.Body>
          {error && <Message variant="danger">{error}</Message>}
          {bulkCreated && <Message>{bulkCreated}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="bulkUpload" className="mb-3">
              <Form.Label>Choose Excel File to Upload</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])} // Use e.target.files[0] for file input
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
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TeacherBulkUpload;
