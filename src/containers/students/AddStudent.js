import DatePicker from 'react-datepicker'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { createStudent } from '../../redux/actions/studentActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

function AddStudent() {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [admissionNumber, setAdmissionNumber] = useState(0)
  const [gradeLevel, setGradeLevel] = useState('')
  const [classLevel, setClassLevel] = useState('')
  const [birthday, setBirthday] = useState(new Date())
  const [gradYear, setGradYear] = useState(2024)
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [stdViiNumber, setStdViiNumber] = useState('')
  const [premsNumber, setPremsNumber] = useState('')
  const [sex, setSex] = useState('')

  const dispatch = useDispatch()

  const studentCreate = useSelector(state => state.studentCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, student: createdStudent } = studentCreate

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createStudent(
      firstName, middleName, lastName, 
      admissionNumber, gradeLevel, classLevel, 
      gradYear, region, city, street,
      stdViiNumber, premsNumber, sex
    ))
  }

  useEffect(() => {
  }, [dispatch, createdStudent])

  return (
    <div>
      <Link to="/sis/students/" className='btn btn-light my-3'>Go Back</Link>
      <Card>
        <Card.Title>Add new student</Card.Title>
        <Card.Body>
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingCreate && <Loader />}
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  id="firstName" 
                  placeholder="First Name" 
                  required
                  type='text'
                  value={firstName}
                  onChange={(e) =>setFirstName(e.target.value)}
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control 
                  id="middleName" 
                  placeholder="Middle Name" 
                  type='text'
                  value={middleName}
                  onChange={(e) =>setMiddleName(e.target.value)}
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  id="lastName" 
                  placeholder="First Name" 
                  required
                  type='text'
                  value={lastName}
                  onChange={(e) =>setLastName(e.target.value)}
                />
              </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Admission Number</Form.Label>
                  <Form.Control 
                    id="admissionNumber" 
                    type='number' 
                    placeholder="Addmission Number"
                    required
                    value={admissionNumber}
                    onChange={(e) =>setAdmissionNumber(e.target.value)}
                    />
                </Form.Group>
              </Col>
              <Col>
                <Form.Select label="Grade Level" 
                  id='gradeLevel'
                  type='text'
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                
                >
                  <option>Grade Level</option>
                  <option value="o-level">O Level</option>
                  <option value="a-level">A Level</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select label="Class Level"
                  id='classLevel'
                  type='text'
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                >
                  <option>Class Level</option>
                  <option value="form one">Form One</option>
                  <option value="form two">Form Two</option>
                  <option value="form three">Form Three</option>
                  <option value="form four">Form Four</option>
                </Form.Select>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Birthday</Form.Label>
                    <DatePicker
                      id="birthday"
                      format='yyyy/MM/dd'
                      selected={birthday}
                      value={birthday}
                      onChange={(date) => setBirthday(date)}
                    />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Grad Year</Form.Label>
                  <Form.Control 
                    id="gradYear" 
                    type='number'
                    value={gradYear}
                    onChange={(e) =>setGradYear(e.target.value)}
                    />
                </Form.Group>
              </Col>
              <Col>
                <Form.Select label="Sex"
                  id='sex'
                  type='text'
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option>Sex</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Form.Select>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <Form.Group>
                <Form.Label>Region</Form.Label>
                <Form.Control 
                  id="region" 
                  placeholder="Region" 
                  value={region}
                  onChange={(e) =>setRegion(e.target.value)}
                />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control 
                  id="city" 
                  placeholder="City" 
                  value={city}
                  onChange={(e) =>setCity(e.target.value)}
                />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                <Form.Label>Street</Form.Label>
                <Form.Control 
                  id="street" 
                  placeholder="Street" 
                  value={street}
                  onChange={(e) =>setStreet(e.target.value)}
                />
                </Form.Group>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>STD VII NUMBER</Form.Label>
                  <Form.Control 
                    id="stdViiNumber" 
                    placeholder="STD VII NUMBER" 
                    type='text'
                    value={stdViiNumber}
                    onChange={(e) =>setStdViiNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                <Form.Label>Prems Number</Form.Label>
                  <Form.Control 
                    id="premsNumber" 
                    placeholder="Prems Number" 
                    type='text'
                    value={premsNumber}
                    onChange={(e) =>setPremsNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <br/>
            <Form.Group>
              <Form.Label>Emergency Phone</Form.Label>
              <Form.Control id="emergencyPhone" placeholder="Emergency Phone" />
            </Form.Group>
            <br/>
            <Form.Group>
              <Button className='primary' type='submit'>Add student</Button>
            </Form.Group>
          </Form>



        </Card.Body>
      </Card>
    </div>
  )
}

export default AddStudent