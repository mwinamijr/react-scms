import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
                        <div className="col-md-10 px-0">
                          <h1 className="display-4 fst-italic">receipt details</h1>
                          <span>{receipt.receipt_no}: {receipt.date} {receipt.payer} </span>
                        </div>
                      </div>
                      )}
             </div>
                    
        </div>
    )
}

export default ReceiptsDetails