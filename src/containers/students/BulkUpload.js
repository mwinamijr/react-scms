import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

import { bulkCreateStudents } from '../../redux/actions/studentActions'

function BulkUpload() {
  const [file, setFile] = useState('')

  const dispatch = useDispatch()

  const studentsBulkCreate = useSelector(state => state.studentsBulkCreate)
  const { loading, error, } = studentsBulkCreate

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(bulkCreateStudents(
      file
    ))
  }

  useEffect(() => {
  }, [dispatch])
  return (
    <div>
      <Link to="/sis/students/" className='btn btn-light my-3'>Go Back</Link>
      <Card>
      <Card.Title>Add new student</Card.Title>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='bulkUpload'>
              <Form.Label>Choose excel file to upload</Form.Label>
              <Form.Control 
                type='file'
                value={file}
                onChange={(e) => setFile(e.value.target)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Button className='primary' type='submit'>Add student</Button>
            </Form.Group>
          </Form>
      </Card.Body>
      </Card>
    </div>
  )
}

export default BulkUpload