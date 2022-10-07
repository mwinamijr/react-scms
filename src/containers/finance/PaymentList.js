import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Table } from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons';

import { listPayments } from '../../redux/actions/financeActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function Payments() {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const paymentList = useSelector(state => state.paymentList)
  const { loading, error, payments } = paymentList

  useEffect(() => {
    dispatch(listPayments())
    
}, [dispatch,])

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="#">
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Payments</Breadcrumb.Item>
        </Breadcrumb>
      <div>
      <div>
        { userInfo.user_type.IsAccountant || userInfo.isAdmin ?
          <div>
            <h1 className="text-center">Payments</h1>
            <Link to="/finance/payments/add" className='btn btn-light my-3'>Add Payment</Link>
            { loading ? <Loader /> :
              error ? <Message variant="danger">{error}</Message> :

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Payment No</th>
                    <th>Paid to</th>
                    <th>Paid for</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Paid by</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                { payments.map(payment => (
                  <tr key={payment.payment_no}>
                    <td>{payment.payment_no}</td>
                    <td>{payment.paid_to}</td>
                    <td>{payment.paid_for}</td>
                    <td>{payment.user}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.paid_by}</td>
                    <td><Link to={`/finance/payments/${payment.id}`}><EditOutlined /></Link></td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            }
              
          </div>
        :
          <Message>You are no authorized to view this page. Please contact the Admin for further details</Message>
        }
      </div>
      </div>
      </div>
    )
}

export default Payments
