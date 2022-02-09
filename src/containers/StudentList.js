import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Card, Col, Row, Table, Tabs, Tab } from 'react-bootstrap';
import { Form, Input, Button, Select, DatePicker, } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { listStudents } from './../actions/studentActions';

function Students() {
  const [key, setKey] = useState('students')
  
  const dispatch = useDispatch()

  const studentList = useSelector(state => state.studentList)
  const { loading, error, students } = studentList

  useEffect(() => {
    dispatch(listStudents())
    
}, [dispatch,])


    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Students</Breadcrumb.Item>
        </Breadcrumb>
      <div>
      <div>
        <div className="text-center">
          <h1>Students</h1>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="students" title="Students">
              <Table striped bordered hover>
                <thead>
                  
                  <tr>
                    <th>Adm No:</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Sex</th>
                    <th>Class</th>
                    <th>Birthday</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                  { students.map(student => (
                    <tr key={student.addmission_number}>
                      <td>{student.addmission_number}</td>
                      <td>{student.first_name}</td>
                      <td>{student.last_name}</td>
                      <td>{student.sex}</td>
                      <td>{student.class_level}</td>
                      <td>{student.birthday}</td>
                      <td><Link to={`/sis/students/${student.addmission_number}`}><EditOutlined /></Link></td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="new" title="New">
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
            </Tab>
          </Tabs>
        </div>
      </div>
      </div>
      </div>
    )
}

export default Students
