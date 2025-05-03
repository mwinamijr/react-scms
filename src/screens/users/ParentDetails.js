import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Breadcrumb } from "antd";
import Loader from "./../../components/Loader";
import Message from "./../../components/Message";
import { parentDetails } from "../../features/user/parentSlice"; // Importing from parentSlice

function ParentDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, parent } = useSelector((state) => state.getParents);

  useEffect(() => {
    dispatch(parentDetails(id));
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

      <Card>
        <Card.Header>Parent Profile</Card.Header>
        <Card.Body>
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : parent ? (
              <Row>
                <Col></Col>
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
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ParentDetails;
