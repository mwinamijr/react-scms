import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col, Table} from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { ReceiptDetails } from '../../redux/actions/financeActions'


function ReceiptsDetails() {
  const dispatch = useDispatch()
    const receiptDetails = useSelector(state => state.receiptDetails)
    const { loading, error, receipt } = receiptDetails
    const { id } = useParams()
    
    useEffect(() => {
      dispatch(ReceiptDetails(id))
    }, [dispatch, id ]) 

    return (
        <div>
            <Link to="/finance/receipts/" className='btn btn-light my-3'>Go Back</Link>
            <div>
              {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                      <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
                        
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
                            <Table>
                              <tbody>
                                <tr>
                                  <td>date</td>
                                  <td>{receipt.date}</td>
                                  <td>Receipt number</td>
                                  <td>{receipt.receipt_no}</td>
                                </tr>
                                <tr>
                                  <td>Payer</td>
                                  <td>{receipt.payer}</td>
                                </tr>
                                <tr>
                                  <td>Student</td>
                                  <td>{receipt.student}</td>
                                </tr>
                                <tr>
                                  <td>Paid for</td>
                                  <td>{receipt.paid_for}</td>
                                </tr>
                                <tr>
                                  <td>amount</td>
                                  <td>{receipt.amount}</td>
                                </tr>
                                <tr>
                                  <td>Received by</td>
                                  <td>{receipt.received_by}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                      </div>
                      )}
             </div>
                    
        </div>
    )
}

export default ReceiptsDetails