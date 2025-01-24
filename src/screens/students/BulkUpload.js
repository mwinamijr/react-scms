import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { bulkCreateStudents } from "../../features/students/studentSlice"; // Import bulkCreateStudents thunk from the slice

function BulkUpload() {
  const [filename, setFilename] = useState("");

  const dispatch = useDispatch();

  // Accessing state from Redux store
  const { loading, error } = useSelector((state) => state.student); // Assuming the state is in 'student'

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch bulkCreateStudents thunk with the filename
    dispatch(bulkCreateStudents(filename));
  };

  return (
    <div>
      <Link to="/sis/students/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card>
        <Card.Title>Bulk Upload Students</Card.Title>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="bulkUpload">
              <Form.Label>Choose Excel file to upload</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFilename(e.target.files[0])} // Make sure to use e.target.files[0] for file input
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Button className="primary" type="submit">
                Upload
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BulkUpload;
