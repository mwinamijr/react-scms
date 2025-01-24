import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getAccountantDetails } from "../../features/user/accountantSlice"; // Import from the slice

function AccountantDetails() {
  const dispatch = useDispatch();

  const { loading, error, accountantDetails } = useSelector(
    (state) => state.accountant
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAccountantDetails(id)); // Dispatch the getAccountantDetails action
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/users/accountants/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Card>
        <Card.Header>Accountant Profile</Card.Header>
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
                        {accountantDetails.id}:{" "}
                        {accountantDetails.user.first_name}{" "}
                        {accountantDetails.user.last_name}
                      </span>
                    </div>
                    <div>
                      <strong>Salary:</strong> {accountantDetails.salary}
                    </div>
                    <div>
                      <strong>Email:</strong> {accountantDetails.user.email}
                    </div>
                    {/* You can add more fields here as necessary */}
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

export default AccountantDetails;
