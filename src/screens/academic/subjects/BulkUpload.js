import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";

import { bulkCreateSubjects } from "../../../features/academic/subjectSlice"; // Import bulkCreateSubjects thunk from the slice

function BulkUpload() {
  const [file, setFile] = useState(null); // Use 'file' to store the uploaded file object

  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { loading, error } = useSelector((state) => state.getSubjects); // Assuming the state is in 'getSubjects'

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch the bulkCreateSubjects thunk with the selected file
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // Append the file to the FormData object
      dispatch(bulkCreateSubjects(formData));
    }
  };

  return (
    <Container className="mt-4">
      <Link to="/sis/students/" className="btn btn-secondary mb-3">
        Go Back
      </Link>
      <Card className="shadow">
        <Card.Header className=" text-white text-center">
          <h5>Bulk Upload Students</h5>
        </Card.Header>
        <Card.Body>
          {error && <Message variant="danger">{error}</Message>}
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

export default BulkUpload;
