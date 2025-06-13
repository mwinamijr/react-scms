import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Col, Row, Breadcrumb } from "antd";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getUserDetails } from "../../features/user/userSlice";
import type { RootState } from "../../app/store"; // Adjust path based on your setup
import { useAppDispatch } from "../../app/hooks";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  isAdmin?: boolean;
  isTeacher?: boolean;
  isAccountant?: boolean;
}

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.getUsers
  );

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(Number(id)));
    }
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

      <Card title="User Profile">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : user ? (
          <Row>
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
      </Card>
    </div>
  );
};

export default UserProfile;
