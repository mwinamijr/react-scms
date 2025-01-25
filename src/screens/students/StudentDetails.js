import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Tab, Tabs, ListGroup } from "react-bootstrap";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";
import { studentDetails } from "../../features/students/studentSlice"; // Use the studentDetails thunk from the slice

function StudentDetailsScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Access student details from Redux store
  const { loading, error, student } = useSelector((state) => state.getStudents);

  const [key, setKey] = useState("info");

  console.log(student);

  useEffect(() => {
    dispatch(studentDetails(id)); // Dispatch the studentDetails thunk to get student data
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/sis/students/" className="btn btn-light my-3">
        Go Back
      </Link>
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <h4>Student Profile</h4>
            <Row className="site-card-wrapper">
              <Col sm={4}>
                <Card>
                  <Card.Header>
                    <h5>
                      {student.first_name} {student.last_name}
                    </h5>
                    <h5 className="text-muted">
                      prems#: {student.prems_number}
                    </h5>
                  </Card.Header>
                  <ListGroup>
                    <ListGroup.Item>
                      Addmission number: {student.addmission_number}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Sex: <span className="float-right">{student.gender}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Date of birth: {student.birthday}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col sm={8}>
                <Card>
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="info" title="Basic Info">
                      <h4>Details</h4>
                      <div>
                        <Row>
                          <Col>Status: active</Col>
                          <Col>Form: {student.class_level}</Col>
                          <Col>Stream: A</Col>
                        </Row>
                        <Row>
                          <Col>Citizenship: Tanzanian</Col>
                          <Col>Health Status: </Col>
                          <Col> </Col>
                        </Row>
                      </div>
                      <hr />
                      <h4>Address</h4>
                      <div>
                        <Row>
                          <Col>Region: {student.region}</Col>
                          <Col>City: {student.city}</Col>
                          <Col>Street: {student.street}</Col>
                        </Row>
                      </div>
                      <hr />
                      <h4>Qualifications</h4>
                      <div>
                        Previous qualifications
                        <Row>
                          <Col>Standard VII #: {student.std_vii_number}</Col>
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="payments" title="Payments">
                      Profile
                    </Tab>
                    <Tab eventKey="attendance" title="Attendance">
                      Contact
                    </Tab>
                    <Tab eventKey="exams" title="Examination">
                      Contact
                    </Tab>
                  </Tabs>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetailsScreen;
