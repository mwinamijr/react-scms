import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Button, Breadcrumb, Form } from 'react-bootstrap'
import axios from 'axios'

import { listStudents } from '../../redux/actions/studentActions';
import { listUsers } from './../../redux/actions/userActions';


const Sms = () => {
  const [sendTo, setSendTo] = useState('')
  const [message, setMessage] = useState('')

  const nodeUrl = 'http://localhost:4001'

  const dispatch = useDispatch()

  const studentList = useSelector(state => state.studentList)
  const { studentLoading, students } = studentList
  
  const userList = useSelector(state => state.userList)
  const { userLoading, users } = userList
  
  
  const employees = []
  const parents = []

  if (!userLoading) {
    //console.log('users', users.length)
    for (const user of users ) {
      //console.log(user.firstName, user.phone)
      employees.push(user.phone)
    }
  }
  
  if (!studentLoading) {
    //console.log('students', students.length)
    for (const student of students ) {
      //console.log(student.firstName, student.lastName, student.parentContact)
      parents.push(student.parentContact)
    }
  }

  //console.log('parents', parents)
  //console.log('employees', employees)
  
  useEffect(() => {
    dispatch(listStudents())
    dispatch(listUsers())
  }, [dispatch,])


  const submitHandler = (e) => {
    e.preventDefault()
    if (sendTo === 'parents') {
      axios.post(`${nodeUrl}/api/notification/sms/send`, { parents, message })
    } else {
      axios.post(`${nodeUrl}/api/notification/sms/send`, { employees, message })
    }

  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>send SMS</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Header className="text-center" style={{fontSize: "24px", }}>Send Sms</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Send To</Form.Label>
              <Form.Select
                id='sendTo'
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
              >
                <option>Select who you want to send message</option>
                <option value='teachers'>Teachers</option>
                <option value='parents'>Parents</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as='textarea'
                rows={4}
                id="message"
                placeholder='Enter your message here'
                value={message}
                onChange={(e)=> setMessage(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Button className='primary' type='submit'>Send SMS</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Sms