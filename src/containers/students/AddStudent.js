import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../../components/Loader'
import Message from './../../components/Message'
import { studentsDetails } from '../../actions/studentActions'

function AddStudent() {
  return (
    <div>
      <Card>
        <Card.Header className="text-center">
          <div className="receipt-bg">
            <h3>
            New Student
            </h3>
          </div>
        </Card.Header>
        <Card.Body className="text-left col-md-8">
          <Card.Title className='pb-3'>Full information</Card.Title>
          <Card.Text>
            <Col>
              <Form>
                <Row>
                    <Col>
                      <Form.Item label="First Name">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item label="Middle Name">
                        <Input /> 
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item label="Last Name">
                        <Input /> 
                      </Form.Item>
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Item label="Addmission Number">
                      <Input type={'number'} /> 
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Grade Level">
                      <Select>
                        <Select.Option value="O-Level">O Level</Select.Option>
                        <Select.Option value="A-Level">A Level</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Class Level">
                      <Select>
                        <Select.Option value="Form One">Form One</Select.Option>
                        <Select.Option value="Form Two">Form Two</Select.Option>
                        <Select.Option value="Form Three">Form Three</Select.Option>
                        <Select.Option value="Form Four">Form Four</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Item label="Birthday">
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Grad Date">
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Graduating Class">
                      <Select>
                        <Select.Option value="2023">Class of 2023</Select.Option>
                        <Select.Option value="2024">Class of 2024</Select.Option>
                        <Select.Option value="2025">Class of 2025</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Item label="Region">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="City">
                      <Input /> 
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="Street">
                      <Input /> 
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Item label="STD VII NUMBER">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label="PREMS NUMBER">
                      <Input /> 
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Emergency Phone">
                  <Input />
                </Form.Item>
                
                <Form.Item>
                  <Button className='primary'>Add student</Button>
                </Form.Item>
              </Form>
              
            </Col>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddStudent