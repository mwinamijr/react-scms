import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Breadcrumb, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import type { RootState } from "../../app/store"; // Update with your actual store paths
import { paymentDetails } from "../../features/finance/paymentSlice";
import { useAppDispatch } from "../../app/hooks";

const PaymentsDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { loading, error, payment } = useSelector(
    (state: RootState) => state.getPayments
  );

  useEffect(() => {
    if (id) {
      dispatch(paymentDetails(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/payments/">Payments</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Details</Breadcrumb.Item>
      </Breadcrumb>

      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
            <Card>
              <Card.Header className="text-center">
                <div className="receipt-bg">
                  <h3>
                    Hayatul Islamiya Secondary <br />
                    P.O. Box 507, Babati - Manyara; Phone: 0788 030052, 0752
                    506523 <br />
                    A/C Number:- NMB: , NBC: <br />
                  </h3>
                </div>
              </Card.Header>
              <Card.Body className="text-left col-md-8">
                <Card.Title className="pb-3">PAYMENT SLIP</Card.Title>
                <Table>
                  <tbody>
                    <tr>
                      <td>Date</td>
                      <td>{payment.date}</td>
                      <td>Payment Number</td>
                      <td>{payment.payment_no}</td>
                    </tr>
                    <tr>
                      <td>Paid To</td>
                      <td>{payment.paid_to}</td>
                    </tr>
                    <tr>
                      <td>User</td>
                      <td>{payment.user}</td>
                    </tr>
                    <tr>
                      <td>Paid For</td>
                      <td>{payment.paid_for}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{payment.amount}</td>
                    </tr>
                    <tr>
                      <td>Paid By</td>
                      <td>{payment.paid_by}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsDetails;
