import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Table, Col, Row } from 'react-bootstrap';
import { EditOutlined, DeleteOutlined, EyeOutlined, CheckOutlined, CheckCircleOutlined, CheckSquareOutlined } from '@ant-design/icons';

import { listReceipts } from '../../redux/actions/financeActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

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
          <Breadcrumb.Item href="#">
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Receipts</Breadcrumb.Item>
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
                    <th>Student</th>
                    <th>Paid for</th>
                    <th>Amount</th>
                    <th>Received by</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                { receipts.map(receipt => (
                  <tr key={receipt.receipt_no}>
                    <td>{receipt.receipt_no}</td>
                    <td>{receipt.student}</td>
                    <td>{receipt.paid_for}</td>
                    <td>{receipt.amount}</td>
                    <td>{receipt.received_by}</td>
                    <td>
                      <Link to={`/finance/receipts/${receipt.id}`}><EyeOutlined /></Link><span>  </span>
                      <Link to={`/finance/receipts/${receipt.id}`}><EditOutlined /></Link><span>  </span>
                      <Link to={`/finance/receipts/${receipt.id}`}><DeleteOutlined /></Link><span>  </span>
                    </td>
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
