import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../features/user/userSlice";
import type { RootState } from "../app/store"; // adjust these paths as needed
import { useAppDispatch } from "../app/hooks";

const RegisterScreen: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAccountant, setIsAccountant] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { error, loading, userInfo } = useSelector(
    (state: RootState) => state.getUsers
  );

  useEffect(() => {
    // this is just a trigger, don't return JSX in useEffect
  }, [userInfo]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

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
  }

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
};

export default RegisterScreen;
