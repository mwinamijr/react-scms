import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Table } from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons';

import { listReceipts } from '../../redux/actions/financeActions';
import Loader from './../../components/Loader';
import Message from './../../components/Message';

function Receipts() {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const receiptList = useSelector(state => state.receiptList)
  const { loading, error, receipts } = receiptList

  useEffect(() => {
    dispatch(listReceipts())
    
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
        { userInfo.user_type.IsAccountant || userInfo.isAdmin ?
          <div>
            <h1 className="text-center">Receipts</h1>
            <Link to="/finance/receipts/add" className='btn btn-light my-3'>Add Receipt</Link>
            { loading ? <Loader /> :
              error ? <Message variant="danger">{error}</Message> :

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Receipt No</th>
                    <th>Payer</th>
                    <th>Paid for</th>
                    <th>Student</th>
                    <th>Amount</th>
                    <th>Received by</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                { receipts.map(receipt => (
                  <tr key={receipt.receipt_no}>
                    <td>{receipt.receipt_no}</td>
                    <td>{receipt.payer}</td>
                    <td>{receipt.paid_for}</td>
                    <td>{receipt.student}</td>
                    <td>{receipt.amount}</td>
                    <td>{receipt.received_by}</td>
                    <td><Link to={`/sis/students/${receipt.addmission_number}`}><EditOutlined /></Link></td>
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

export default Receipts
