import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../features/user/userSlice"; // Import the login action

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { error, loading, userInfo } = user;

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      // Redirect to the homepage (or any other page you want)
      return <Navigate replace to="/" />;
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch the login action with email and password
    dispatch(login({ email, password }));
  };

  if (userInfo) {
    // Redirect to homepage after successful login
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
          <h1>Sign In</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <br />
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
        </FormContainer>
      </div>
    );
  }
}

export default LoginScreen;
