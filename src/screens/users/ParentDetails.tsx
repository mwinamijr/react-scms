import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store"; // Adjust if your store file is elsewhere
import { Card, Col, Row, Breadcrumb } from "antd";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { parentDetails } from "../../features/user/parentSlice";
import { useAppDispatch } from "../../app/hooks";

// Type for parent object
interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  // add more fields as needed
}

const ParentDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { loading, error, parent } = useSelector(
    (state: RootState) =>
      state.getParents as {
        loading: boolean;
        error: string | null;
        parent: Parent | null;
      }
  );

  useEffect(() => {
    if (id) {
      dispatch(parentDetails(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users/parents/">Parents</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Parent Profile</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Parent Profile">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : parent ? (
          <Row justify="center">
            <Col>
              <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
                <div className="col-md-10 px-0">
                  <span>
                    {parent.id}: {parent.first_name} {parent.last_name}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Message variant="info">No Parent details found.</Message>
        )}
      </Card>
    </div>
  );
};

export default ParentDetails;
