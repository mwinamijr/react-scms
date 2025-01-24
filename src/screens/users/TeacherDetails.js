import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getTeacherDetails } from "../../features/user/teacherSlice"; // Use the correct import path for the teacherSlice

function TeacherProfile() {
  const dispatch = useDispatch();

  // Access teacher details from the store
  const { loading, error, teacherDetails } = useSelector(
    (state) => state.teacher
  );

  // Extract teacher id from URL params
  const { id } = useParams();

  // Dispatch getTeacherDetails action to fetch teacher data
  useEffect(() => {
    dispatch(getTeacherDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/users/teachers/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card>
        <Card.Header>Teacher Profile</Card.Header>
        <Card.Body>
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Row>
                <Col></Col>
                <Col>
                  <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
                    <div className="col-md-10 px-0">
                      {/* Display teacher details */}
                      <span>
                        {teacherDetails.id}: {teacherDetails.user.first_name}{" "}
                        {teacherDetails.user.last_name}
                      </span>
                      <br />
                      <span>Email: {teacherDetails.user.email}</span>{" "}
                      {/* Assuming teacher object has email */}
                      <br />
                      <span>Phone: {teacherDetails.phone}</span>{" "}
                      {/* Assuming teacher object has phone */}
                      <br />
                      <span>Salary: {teacherDetails.salary}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default TeacherProfile;
