import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Tab, Tabs, ListGroup } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { studentDetails } from "../../features/students/studentSlice"; // Use the studentDetails thunk

function StudentDetailsScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Access student details from Redux store
  const { loading, error, student } = useSelector((state) => state.getStudents);

  const [key, setKey] = useState("info");

  useEffect(() => {
    dispatch(studentDetails(id)); // Fetch the student details
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
        ) : student ? (
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
                      PREMS#: {student.prems_number || "N/A"}
                    </h5>
                  </Card.Header>
                  <ListGroup>
                    <ListGroup.Item>
                      Admission Number: {student.admission_number || "N/A"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Sex:{" "}
                      <span className="float-right">
                        {student.gender || "N/A"}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Date of Birth: {student.date_of_birth || "N/A"}
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
                    className="container mb-3"
                  >
                    <Tab eventKey="info" title="Basic Info" className="m-3">
                      <h4>Details</h4>
                      <div>
                        <Row className="mb-3">
                          <Col>Status: Active</Col>
                          <Col>Form: {student.class_level || "N/A"}</Col>
                          <Col>Stream: A</Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>Citizenship: Tanzanian</Col>
                          <Col>
                            Health Status: {student.health_status || "N/A"}
                          </Col>
                          <Col></Col>
                        </Row>
                      </div>
                      <hr />
                      <h4>Address</h4>
                      <div>
                        <Row>
                          <Col>Region: {student.region || "N/A"}</Col>
                          <Col>City: {student.city || "N/A"}</Col>
                          <Col>Street: {student.street || "N/A"}</Col>
                        </Row>
                      </div>
                      <hr />
                      <h4>Qualifications</h4>
                      <div>
                        <Row>
                          <Col>
                            Standard VII #: {student.std_vii_number || "N/A"}
                          </Col>
                        </Row>
                      </div>
                    </Tab>
                    <Tab eventKey="payments" title="Payments" className="m-3">
                      Payments information coming soon.
                    </Tab>
                    <Tab
                      eventKey="attendance"
                      title="Attendance"
                      className="m-3"
                    >
                      Attendance records coming soon.
                    </Tab>
                    <Tab eventKey="exams" title="Examination" className="m-3">
                      Examination records coming soon.
                    </Tab>
                  </Tabs>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <Message variant="info">No student details found.</Message>
        )}
      </div>
    </div>
  );
}

export default StudentDetailsScreen;
