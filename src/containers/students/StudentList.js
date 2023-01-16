import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Table, Row, Col } from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons';

import { listStudents } from '../../redux/actions/studentActions';
import Loader from './../../components/Loader';
import Message from './../../components/Message';

function Students() {
  
  const dispatch = useDispatch()

  const studentList = useSelector(state => state.studentList)
  const { loading, error, students } = studentList

  useEffect(() => {
    dispatch(listStudents())
    
}, [dispatch,])


  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item href="#">
          Library
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Students</Breadcrumb.Item>
      </Breadcrumb>
    <div>
    <div>
      <div>
        <h1 className="text-center">Students</h1>
        <Row>
          <Col><Link to="/sis/students/add" className='btn btn-light my-3'>Add Student</Link></Col>
          <Col><Link to="/sis/students/upload" className='btn btn-light my-3'>Bulk Upload Students</Link></Col>
        </Row>
          { loading ? <Loader /> :
            error ? <Message variant="danger">{error}</Message> :
            
            <Table striped bordered hover>
              <thead>
                
                <tr>
                  <th>Adm No:</th>
                  <th>Full Name</th>
                  <th>Sex</th>
                  <th>Class</th>
                  <th>Birthday</th>
                  <th>Actions</th>
                </tr>
              </thead>
                
              
              <tbody>
                  
                { students.map(student => (
                  <tr key={student.addmissionNumber}>
                    <td>{student.addmissionNumber}</td>
                    <td>{student.firstName} {student.middleName} {student.lastName}</td>
                    <td>{student.gender}</td>
                    <td>{student.classLevel}</td>
                    <td>{student.birthday}</td>
                    <td><Link to={`/sis/students/${student._id}`}><EditOutlined /></Link></td>
                  </tr>
                ))}
              
              </tbody>
            </Table>
          }
      </div>
    </div>
    </div>
    </div>
  )
}

export default Students
