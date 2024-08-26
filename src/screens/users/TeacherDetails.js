import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Col, Row } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { getTeacherDetails } from '../../redux/actions/userActions'

function UserProfile() {
  const dispatch = useDispatch()
    const teacherDetails = useSelector(state => state.teacherDetails)
    const { loading, error, teacher } = teacherDetails
    const { id } = useParams()
    
    useEffect(() => {
      dispatch(getTeacherDetails(id))
    }, [dispatch, id ]) 

  return (
    <div>
      <Link to="/users/teachers/" className='btn btn-light my-3'>Go Back</Link>
      <Card>
        <Card.Header>Teacher Profile</Card.Header>
        <Card.Body>
          <div>
            {loading ?
              <Loader />
              : error
                  ? <Message variant='danger'>{error}</Message>
                  : (
                  <Row>
                    <Col></Col>
                    <Col>
                      <div className="p-4 p-md-5 mb-4 text-black rounded bg-light">
                        <div className="col-md-10 px-0">
                          <span>{teacher.id}: {teacher.user}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                    )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default UserProfile