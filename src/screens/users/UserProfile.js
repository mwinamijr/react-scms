import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Breadcrumb } from "antd";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";
import { getUserDetails } from "../../features/user/userSlice"; // Importing from userSlice

function UserProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.getUsers);

  console.log(user);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users/">Users</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>User Profile</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Header>User Profile</Card.Header>
        <Card.Body>
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : user ? (
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
            ) : (
              <Message variant="info">No User details found.</Message>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;
