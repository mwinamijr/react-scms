import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Card, Col, Row, Table, Tabs, Tab } from 'react-bootstrap';
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
} from 'antd';
import { listStudents } from './../actions/studentActions';
;


function Students() {
  const [key, setKey] = useState('students')
  
  const dispatch = useDispatch()

  const studentList = useSelector(state => state.studentList)
  const { loading, error, students } = studentList

  console.log(students)

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
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
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
                    <th>Number</th>
                    <th>Full Name</th>
                    <th>Teaching Subjects</th>
                    <th>Amonunt</th>
                    <th>Received by</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                  </tr>
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
                              <Form.Item label="Last Name">
                                <Input /> 
                              </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Email">
                          <Input type={'email'} />
                        </Form.Item>
                        <Form.Item label="Teaching Subject">
                          <Select>
                            <Select.Option value="Maths">Maths</Select.Option>
                            <Select.Option value="Chemistry">Chemistry</Select.Option>
                            <Select.Option value="History">History</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="Salary">
                          <InputNumber />
                        </Form.Item>
                        <Form.Item>
                          <Button className='primary'>Add teacher</Button>
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
