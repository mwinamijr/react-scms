import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { Card, Form, Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { bulkCreateTeachers } from "../../features/user/teacherSlice";
import type { RootState } from "../../app/store"; // Adjust path
import { useAppDispatch } from "../../app/hooks";

interface NotCreatedTeacher {
  first_name: string;
  last_name: string;
  error: string;
}

const TeacherBulkUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [notCreatedTeachers, setNotCreatedTeachers] = useState<
    NotCreatedTeacher[]
  >([]);

  const dispatch = useAppDispatch();
  const { loading, error } = useSelector(
    (state: RootState) => state.getTeachers
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    dispatch(bulkCreateTeachers(file))
      .unwrap()
      .then(
        (response: { message: string; not_created?: NotCreatedTeacher[] }) => {
          setUploadMessage(response.message);
          setNotCreatedTeachers(response.not_created || []);
        }
      )
      .catch((err: any) => {
        console.error("Upload failed:", err);
      });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
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
                onChange={onFileChange}
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
};

export default TeacherBulkUpload;
