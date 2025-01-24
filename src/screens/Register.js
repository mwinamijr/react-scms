import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../features/user/userSlice";

function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAccountant, setIsAccountant] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { error, loading, userInfo } = user;

  useEffect(() => {
    if (userInfo) {
      return <Navigate replace to="/" />;
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    // Dispatch the register action
    dispatch(
      register({
        firstName,
        lastName,
        email,
        phone,
        password,
        isTeacher,
        isAdmin,
        isAccountant,
      })
    );
  };

  if (userInfo) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div>
        <div className="container">
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
        </div>
        <FormContainer>
          <h1>Sign Up</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isTeacher">
              <Form.Check
                type="checkbox"
                label="Are you a Teacher?"
                checked={isTeacher}
                onChange={(e) => setIsTeacher(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Are you an Admin?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Form.Group controlId="isAccountant">
              <Form.Check
                type="checkbox"
                label="Are you an Accountant?"
                checked={isAccountant}
                onChange={(e) => setIsAccountant(e.target.checked)}
              />
            </Form.Group>

            <br />
            <Button type="submit" variant="primary">
              Sign Up
            </Button>
          </Form>
        </FormContainer>
      </div>
    );
  }
}

export default RegisterScreen;
