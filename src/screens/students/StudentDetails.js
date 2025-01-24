import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Tab, Tabs, ListGroup } from "react-bootstrap";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";
import { studentDetails } from "../../redux/slices/studentSlice"; // Use the studentDetails thunk from the slice

function StudentDetailsScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Access student details from Redux store
  const { loading, error, studentDetails } = useSelector(
    (state) => state.student
  );

  const [key, setKey] = useState("info");

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
                      {studentDetails.first_name} {studentDetails.last_name}
                    </h5>
                    <h5 className="text-muted">
                      prems#: {studentDetails.prems_number}
                    </h5>
                  </Card.Header>
                  <ListGroup>
                    <ListGroup.Item>
                      Addmission number: {studentDetails.addmission_number}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Sex:{" "}
                      <span className="float-right">
                        {studentDetails.gender}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Date of birth: {studentDetails.birthday}
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
                          <Col>Form: {studentDetails.class_level}</Col>
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
                          <Col>Region: {studentDetails.region}</Col>
                          <Col>City: {studentDetails.city}</Col>
                          <Col>Street: {studentDetails.street}</Col>
                        </Row>
                      </div>
                      <hr />
                      <h4>Qualifications</h4>
                      <div>
                        Previous qualifications
                        <Row>
                          <Col>
                            Standard VII #: {studentDetails.std_vii_number}
                          </Col>
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
