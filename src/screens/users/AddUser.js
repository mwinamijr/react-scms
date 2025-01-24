import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { register, resetError } from "../../redux/slices/userSlice"; // Updated import

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
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.user);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/users");
    }
    if (error) {
      dispatch(resetError()); // Reset error after user info is set or error is handled
    }
  }, [userInfo, error, navigate, dispatch]);

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
    <div>
      <Link to="/users/" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <InputGroup>
            <InputGroup.Text>Full Names</InputGroup.Text>
            <Form.Control
              required
              type="name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Control
              required
              type="name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </InputGroup>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <InputGroup>
            <InputGroup.Text>
              Please choose user types to register
            </InputGroup.Text>
            <Form.Check
              type="checkbox"
              label="admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="accountant"
              checked={isAccountant}
              onChange={(e) => setIsAccountant(e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="teacher"
              checked={isTeacher}
              onChange={(e) => setIsTeacher(e.target.checked)}
            />
          </InputGroup>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default AddUser;
