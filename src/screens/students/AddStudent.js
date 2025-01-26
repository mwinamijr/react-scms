import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import {
  createStudent,
  resetCreateState,
} from "../../features/students/studentSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

function AddStudent() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState(0);
  const [classLevel, setClassLevel] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [stdViiNumber, setStdViiNumber] = useState("");
  const [premsNumber, setPremsNumber] = useState("");
  const [gender, setGender] = useState("");
  const [parentContact, setParentContact] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingCreate, errorCreate, successCreate } = useSelector(
    (state) => state.getStudents
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createStudent({
        firstName,
        middleName,
        lastName,
        admissionNumber,
        classLevel,
        birthday,
        region,
        city,
        street,
        parentContact,
        stdViiNumber,
        premsNumber,
        gender,
      })
    );
  };

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      navigate("/sis/students");
    }
  }, [dispatch, successCreate, navigate]);

  return (
    <Container className="mt-4">
      <Link to="/sis/students/" className="btn btn-secondary mb-3">
        Go Back
      </Link>
      <Card className="shadow">
        <Card.Header className="text-white text-center">
          <h5>Add New Student</h5>
        </Card.Header>
        <Card.Body>
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          {loadingCreate && <Loader />}
          <Form onSubmit={submitHandler}>
            {/* Personal Information */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
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
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter middle name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
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

            {/* Academic Details */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Admission Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter admission number"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Class Level</Form.Label>
                  <Form.Select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                  >
                    <option value="">Choose class level</option>
                    <option value="form one">Form One</option>
                    <option value="form two">Form Two</option>
                    <option value="form three">Form Three</option>
                    <option value="form four">Form Four</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Additional Information */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Birthday</Form.Label>
                  <DatePicker
                    className="form-control"
                    selected={birthday}
                    onChange={(date) => setBirthday(date)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Choose gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Contact Information */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>STD VII Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter STD VII Number"
                    value={stdViiNumber}
                    onChange={(e) => setStdViiNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Prems Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Prems Number"
                    value={premsNumber}
                    onChange={(e) => setPremsNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Parent Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter parent phone number"
                value={parentContact}
                onChange={(e) => setParentContact(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Add Student
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddStudent;
