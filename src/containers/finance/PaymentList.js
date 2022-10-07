
import React, {useState} from 'react'
import { Breadcrumb, Card, Col, Row, Table, Tabs, Tab } from 'react-bootstrap';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';

function Payments() {
  const [key, setKey] = useState('payments')
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
          <h1>Payments</h1>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="payments" title="Payments">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Receipt No</th>
                    <th>Paid to</th>
                    <th>Allocation</th>
                    <th>Amonunt</th>
                    <th>Paid by</th>
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
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Username</th>
                  </tr>
                </thead>
              </Table>
            </Tab>
            <Tab eventKey="new" title="New">
              <Card>
                <Card.Header className="text-center">
                  <div className="receipt-bg">
                    <h3>
                    Hayatul Islamiya Secondary <br />
                    P.O. Box 507, Babati - Manyara; Phone: 0788 030052, 0752 506523 <br />
                    A/C Number:- NMB:          , NBC:  <br />
                    </h3>
                  </div>
                </Card.Header>
                <Card.Body className="text-left col-md-5">
                  <Card.Title className='pb-3'>PAYMENT FORM</Card.Title>
                  <Card.Text>
                    <Col>
                      <Form>
                        <Row>
                          <Col>
                            <Form.Item label="Date">
                              <DatePicker />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item label="Receipt Number">
                              <InputNumber />
                            </Form.Item>
                          </Col>
                        </Row>
                        
                        <Form.Item label="Paid to">
                          <Input />
                        </Form.Item>
                        <Form.Item label="Amount">
                          <InputNumber />
                        </Form.Item>
                        <Form.Item label="Paid for">
                          <Select>
                            <Select.Option value="Salaries">School Fees</Select.Option>
                            <Select.Option value="Examinations">Exam Fees</Select.Option>
                            <Select.Option value="Food">Allowances</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="Paid By">
                          <Input />
                        </Form.Item>
                        <Form.Item>
                          <Button className='primary'>Submit Payment</Button>
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

export default Payments
