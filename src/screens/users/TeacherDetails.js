import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getTeacherDetails } from "../../features/user/teacherSlice";

function TeacherProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, teacher } = useSelector((state) => state.getTeachers);

  useEffect(() => {
    console.log("Dispatching getTeacherDetails with id:", id); // Debug log
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
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : teacher ? (
            <Row>
              <Col></Col>
              <Col>
                <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
                  <div className="col-md-10 px-0">
                    <span>
                      {teacher.id}: {teacher.first_name} {teacher.last_name}
                    </span>
                    <br />
                    <span>Email: {teacher.email}</span>
                    <br />
                    <span>Phone: {teacher.phone_number}</span>
                    <br />
                    <span>Salary: {teacher.salary}</span>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Message variant="info">No teacher found</Message>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default TeacherProfile;
