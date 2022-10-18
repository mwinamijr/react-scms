import React, {useEffect, useState} from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../../components/Message';

function AddReceipt() {
  const [receiptNumber, setReceiptNumber] = useState('')
  const [student, setStudent] = useState('')
  const [payer, setPayer] = useState('')
  const [paidFor, setPaidFor] = useState('')
  const [amount, setAmount] = useState(0)
  const [receivedBy, setReceivedBy] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div>
      <Link to="/finance/receipts/" className='btn btn-light my-3'>Go Back</Link>
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
            <Form>
              <Form.Group>
                <Form.Label>Receipt Number</Form.Label>
                <Form.Control 
                  id="receiptNumber" 
                  placeholder="Receipt Number" 
                  required
                  type='number'
                  value={receiptNumber}
                  onChange={(e) =>setReceiptNumber(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Payer</Form.Label>
                <Form.Control 
                  id="payer" 
                  placeholder="payer" 
                  required
                  type='text'
                  value={payer}
                  onChange={(e) =>setPayer(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Student</Form.Label>
                <Form.Control 
                  id="student" 
                  placeholder="student" 
                  required
                  type='text'
                  value={student}
                  onChange={(e) =>setStudent(e.target.value)}
                />
              </Form.Group>
              <Form.Select label="Paid For" 
                id='paidFor'
                type='text'
                value={paidFor}
                onChange={(e) => setPaidFor(e.target.value)}
              
              >
                <option>Paid For</option>
                <option value="1">School Fees</option>
                <option value="2">Tour</option>
                <option value="3">Allowances</option>
              </Form.Select>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control 
                  id="amount" 
                  placeholder="Amount" 
                  required
                  type='number'
                  value={amount}
                  onChange={(e) =>setAmount(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Received By</Form.Label>
                <Form.Control 
                  id="receivedBy" 
                  placeholder="receivedBy" 
                  required
                  type='text'
                  value={receivedBy}
                  onChange={(e) =>setReceivedBy(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Button className='primary'>Submit Payment</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        :
        <Message>You are no authorized to view this page. Please contact the Admin for further details</Message>
      }
    </div>
  )
}

export default AddReceipt