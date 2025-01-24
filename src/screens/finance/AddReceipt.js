import React, { useEffect, useState } from "react";
import { Card, Form, Button, Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { createReceipt } from "../../redux/slices/financeSlice"; // Import from financeSlice

function AddReceipt() {
  const [receiptNumber, setReceiptNumber] = useState("");
  const [student, setStudent] = useState("");
  const [payer, setPayer] = useState("");
  const [paidFor, setPaidFor] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access state from financeSlice
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.finance.receiptCreate);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createReceipt({
        receiptNumber,
        payer,
        student,
        paidFor,
        amount,
      })
    );
  };

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/receipts");
    }
  }, [dispatch, navigate, successCreate]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          <Link to="/finance/receipts/">Receipts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add Receipt</Breadcrumb.Item>
      </Breadcrumb>
      <Link to="/finance/receipts/" className="btn btn-light my-3">
        Go Back
      </Link>
      {userInfo.user_type.isAccountant || userInfo.isAdmin ? (
        <Card>
          <Card.Header className="text-center">
            <div className="receipt-bg">
              <h3>
                Hayatul Islamiya Secondary <br />
                P.O. Box 507, Babati - Manyara; Phone: 0788 030052, 0752 506523{" "}
                <br />
                A/C Number:- NMB: , NBC: <br />
              </h3>
            </div>
          </Card.Header>
          <Card.Body className="text-left col-md-8">
            <Card.Title className="pb-3">PAYMENT RECEIPT</Card.Title>
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loadingCreate && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Receipt Number</Form.Label>
                <Form.Control
                  id="receiptNumber"
                  placeholder="Receipt Number"
                  required
                  type="number"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Payer</Form.Label>
                <Form.Control
                  id="payer"
                  placeholder="Payer"
                  required
                  type="text"
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Student</Form.Label>
                <Form.Control
                  id="student"
                  placeholder="Student"
                  required
                  type="text"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                />
              </Form.Group>
              <Form.Select
                label="Paid For"
                id="paidFor"
                value={paidFor}
                onChange={(e) => setPaidFor(e.target.value)}
              >
                <option>Paid For</option>
                <option value="school fees">School Fees</option>
                <option value="examination fees">Exam Fees</option>
                <option value="allowances">Allowances</option>
              </Form.Select>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  id="amount"
                  placeholder="Amount"
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Button className="primary" type="submit">
                  Submit Payment
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <Message>
          You are not authorized to view this page. Please contact the Admin for
          further details
        </Message>
      )}
    </div>
  );
}

export default AddReceipt;
