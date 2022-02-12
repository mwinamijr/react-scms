import { DatePicker } from 'antd'
import React, { useEffect } from 'react'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'

function AddStudent() {
  return (
    <div>
      <Card>
        <Card.Title>Add new student</Card.Title>
        <Card.Body>
            <Form>
              <Row>
                <Col>
                <Form.Group>
                  <Form.Label htmlFor="First Name">First Name</Form.Label>
                  <Form.Control id="firstName" placeholder="First Name" />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                  <Form.Label htmlFor="Middle Name">Middle Name</Form.Label>
                  <Form.Control id="middleName" placeholder="Middle Name" />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                  <Form.Label htmlFor="Last Name">Last Name</Form.Label>
                  <Form.Control id="lastName" placeholder="Last Name" />
                </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control id="admissionNumber" type='number' placeholder="Addmission Number" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Select label="Grade Level">
                    <option>Grade Level</option>
                    <option value="O-Level">O Level</option>
                    <option value="A-Level">A Level</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select label="Class Level">
                    <option>Class Level</option>
                    <option value="Form One">Form One</option>
                    <option value="Form Two">Form Two</option>
                    <option value="Form Three">Form Three</option>
                    <option value="Form Four">Form Four</option>
                  </Form.Select>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="birthday">Birthday</Form.Label>
                    <DatePicker />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group label="Grad Date">
                    <Form.Label htmlFor="gradDate">Grad Date</Form.Label>
                    <DatePicker />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Select label="Graduating Class">
                    <option>Graduating Class</option>
                    <option value="2023">Class of 2023</option>
                    <option value="2024">Class of 2024</option>
                    <option value="2025">Class of 2025</option>
                  </Form.Select>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <Form.Group>
                  <Form.Label htmlFor="region">Region</Form.Label>
                  <Form.Control id="region" placeholder="Region" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                  <Form.Label htmlFor="city">City</Form.Label>
                  <Form.Control id="city" placeholder="City" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                  <Form.Label htmlFor="street">Street</Form.Label>
                  <Form.Control id="street" placeholder="Street" />
                  </Form.Group>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label htmlFor="stdViiNumber">STD VII NUMBER</Form.Label>
                    <Form.Control id="stdViiNumber" placeholder="STD VII NUMBER" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                  <Form.Label htmlFor="Prems Number">Prems Number</Form.Label>
                    <Form.Control id="premsNumber" placeholder="Prems Number" />
                  </Form.Group>
                </Col>
              </Row>
              <br/>
              <Form.Group>
                <Form.Label htmlFor="Emergency Phone">Emergency Phone</Form.Label>
                <Form.Control id="emergencyPhone" placeholder="Emergency Phone" />
              </Form.Group>
              <br/>
              <Form.Group>
                <Button className='primary'>Add student</Button>
              </Form.Group>
            </Form>

        </Card.Body>
      </Card>
    </div>
  )
}

export default AddStudent