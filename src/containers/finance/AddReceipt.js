import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';
import Message from '../../components/Message';

function AddReceipt() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  return (
    <div>
      <Link to="/receipts/" className='btn btn-light my-3'>Go Back</Link>
      { userInfo.user_type.IsAccountant || userInfo.isAdmin ?
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
          <Card.Body className="text-left col-md-8">
            <Card.Title className='pb-3'>PAYMENT RECEIPT</Card.Title>
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
                
                <Form.Item label="Received From">
                  <Input />
                </Form.Item>
                <Form.Item label="Amount">
                  <InputNumber />
                </Form.Item>
                <Form.Item label="Paid for">
                  <Select>
                    <Select.Option value="School Fees">School Fees</Select.Option>
                    <Select.Option value="Exam Fees">Exam Fees</Select.Option>
                    <Select.Option value="Allowances">Allowances</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Received By">
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button className='primary'>Submit Payment</Button>
                </Form.Item>
              </Form>
              
            </Col>
          </Card.Body>
        </Card>
        :
        <Message>You are no authorized to view this page. Please contact the Admin for further details</Message>
      }
    </div>
  )
}

export default AddReceipt