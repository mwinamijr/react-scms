import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';

import { listStudents } from '../redux/actions/studentActions';
import { listUsers, listTeachers, listAccountants } from '../redux/actions/userActions';
//import Loader from './../components/Loader';
//import Message from './../components/Message';

function Dashboard() {
  const dispatch = useDispatch()

  const studentList = useSelector(state => state.studentList)
  const { students } = studentList

  const userList = useSelector(state => state.userList)
  const { users } = userList

  const teacherList = useSelector(state => state.teacherList)
  const { teachers } = teacherList

  const accountantList = useSelector(state => state.accountantList)
  const { accountants } = accountantList

  console.log(students.length)

  useEffect(() => {
    dispatch(listStudents())
    dispatch(listUsers())
    dispatch(listAccountants())
    dispatch(listTeachers())
  }, [dispatch,])

  return (
    <div>
      <h1>Dashboard</h1>
      <Row>
        <Col>
          <Card>
            <Card.Header>
            <Link to='/sis/students'>Students</Link>
            </Card.Header>
            <Card.Body>{students.length}</Card.Body>
            <Card.Footer>
            <Link to="/sis/students/add" className='btn btn-light my-3'>Add Student</Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Link to='/users/teachers'>Teachers</Link>
            </Card.Header>
            <Card.Body>
              {teachers.length}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Link to='/users/accountants'>Accountants</Link>
            </Card.Header>
            <Card.Body>
              {accountants.length}
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <Link to='/users'>Users</Link>
            </Card.Header>
            <Card.Body>
              {users.length}
            </Card.Body>
            <Card.Footer>
              <Link to="/users/add" className='btn btn-dark my-3'>Add User</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
