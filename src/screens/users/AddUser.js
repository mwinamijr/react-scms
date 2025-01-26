import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { register, resetError } from "../../features/user/userSlice";

function AddUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAccountant, setIsAccountant] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.getUsers);

  useEffect(() => {
    if (error) {
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        password,
        isAdmin,
        isAccountant,
        isTeacher,
      };
      dispatch(register(userData));
    }
  };

  return (
    <div className="mt-4">
      <Link to="/users/" className="btn btn-light mb-4">
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-center mb-4">Register User</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="roles" className="mb-4">
            <Form.Label>User Roles</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                id="admin"
                type="checkbox"
                label="Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <Form.Check
                id="accountant"
                type="checkbox"
                label="Accountant"
                checked={isAccountant}
                onChange={(e) => setIsAccountant(e.target.checked)}
              />
              <Form.Check
                id="teacher"
                type="checkbox"
                label="Teacher"
                checked={isTeacher}
                onChange={(e) => setIsTeacher(e.target.checked)}
              />
            </div>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Register
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default AddUser;
