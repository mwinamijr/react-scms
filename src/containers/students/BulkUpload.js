import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { bulkCreateStudents } from '../../redux/actions/studentActions'

function BulkUpload() {
  return (
    <div>
      <Link to="/sis/students/" className='btn btn-light my-3'>Go Back</Link>
      <Card>
        <Form>
          <Form.Group controlId='bulkUpload'>
            <Form.Label>Choose excel file to upload</Form.Label>
            <Form.Control type='file' />
          </Form.Group>
          <Form.Group>
            <Button className='primary' type='submit'>Add student</Button>
          </Form.Group>
        </Form>
      </Card>
    </div>
  )
}

export default BulkUpload