import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";
import { getUserDetails } from "../../features/user/userSlice"; // Importing from userSlice

function UserProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/users/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card>
        <Card.Header>User Profile</Card.Header>
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
                      <span>
                        {user.id}: {user.first_name} {user.last_name}
                      </span>
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

export default UserProfile;
