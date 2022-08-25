import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './../../components/Loader'
import Message from './../../components/Message'
import { studentsDetails } from '../../redux/actions/studentActions'


function StudentDetailsScreen() {
    const dispatch = useDispatch()
    const studentDetails = useSelector(state => state.studentDetails)
    const { loading, error, student } = studentDetails
    const { id } = useParams()
    
    useEffect(() => {
      dispatch(studentsDetails(id))
    }, [dispatch, id ]) 

    return (
        <div>
            <Link to="/sis/students/" className='btn btn-light my-3'>Go Back</Link>
            <div>
              {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                      <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
                        <div className="col-md-10 px-0">
                          <h1 className="display-4 fst-italic">student details</h1>
                          <span>{student.addmission_number}: {student.first_name} {student.last_name} </span>
                        </div>
                      </div>
                      )}
             </div>
                    
        </div>
    )
}

export default StudentDetailsScreen
