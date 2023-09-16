import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Table } from 'react-bootstrap';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { listTeachers } from '../../redux/actions/userActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function TeacherList() {
  
  const dispatch = useDispatch()

  const teacherList = useSelector(state => state.teacherList)
  const { loading, error, teachers } = teacherList

  useEffect(() => {
    dispatch(listTeachers())
    
}, [dispatch,])


    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Teachers</Breadcrumb.Item>
        </Breadcrumb>
      <div>
      <div>
        <div>
          <h1 className="text-center">Teachers</h1>
            { loading ? <Loader /> :
              error ? <Message variant="danger">{error}</Message> :
              
              <Table striped bordered hover>
                <thead>
                  
                  <tr>
                    <th>Emp Id</th>
                    <th>Full Name</th>
                    <th>Short Name</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                  
                <tbody>
                    
                  { teachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td>{teacher.empId}</td>
                      <td>{teacher.user}</td>
                      <td>{teacher.short_name}</td>
                      <td>{teacher.salary}</td>
                      <td>
                        <Link to={`/users/teachers/${teacher.id}`}><EyeOutlined /></Link><span>  </span>
                        <Link to={`/users/teachers/${teacher.id}`}><EditOutlined /></Link><span>  </span>
                        <DeleteOutlined />
                      </td>
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

export default TeacherList
