import React, {useEffect, useState} from 'react'
import { Card, Form, Button, Breadcrumb } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { createPayment } from '../../redux/actions/financeActions'

function AddPayment() {
  const [paymentNumber, setPaymentNumber] = useState('')
  const [user, setUser] = useState('')
  const [paidTo, setPaidTo] = useState('')
  const [paidFor, setPaidFor] = useState('')
  const [amount, setAmount] = useState(0)
  const [paidBy, setPaidBy] = useState('')

  const dispatch = useDispatch()
  const paymentCreate = useSelector(state => state.paymentCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, receipt: createdPayment } = paymentCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createPayment(
      paymentNumber, paidTo, user, 
      paidFor, amount, paidBy
    ))
  }

  useEffect(() => {
  }, [dispatch, createdPayment])

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">
        <Link to="/finance/payments/">Payments</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>add payment</Breadcrumb.Item>
      </Breadcrumb>
      <Link to="/finance/payments/" className='btn btn-light my-3'>Go Back</Link>
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
            <Card.Title className='pb-3'>PAYMENT INVOICE</Card.Title>
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingCreate && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Payment Number</Form.Label>
                <Form.Control 
                  id="rpaymentNumber" 
                  placeholder="Payment Number" 
                  required
                  type='number'
                  value={paymentNumber}
                  onChange={(e) =>setPaymentNumber(e.target.value)}
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Paid To</Form.Label>
                <Form.Control 
                  id="paidTo" 
                  placeholder="Paid to" 
                  required
                  type='text'
                  value={paidTo}
                  onChange={(e) =>setPaidTo(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>User</Form.Label>
                <Form.Control 
                  id="user" 
                  placeholder="user" 
                  required
                  type='text'
                  value={user}
                  onChange={(e) =>setUser(e.target.value)}
                />
              </Form.Group>
              <Form.Select label="Paid For" 
                id='paidFor'
                type='text'
                value={paidFor}
                onChange={(e) => setPaidFor(e.target.value)}
              
              >
                <option>Paid For</option>
                <option value="1">Salary</option>
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
                <Form.Label>Paid By</Form.Label>
                <Form.Control 
                  id="paidBy" 
                  placeholder="paidBy" 
                  required
                  type='text'
                  value={paidBy}
                  onChange={(e) =>setPaidBy(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Button className='primary' type='submit'>Submit Payment</Button>
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

export default AddPayment