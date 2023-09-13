import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Table, Row, Col } from 'react-bootstrap';
import { EyeOutlined, EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { listUsers } from './../../redux/actions/userActions';
import Loader from './../../components/Loader';
import Message from './../../components/Message';

function UserList() {
  
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  useEffect(() => {
    dispatch(listUsers())
    
}, [dispatch,])


    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Users</Breadcrumb.Item>
        </Breadcrumb>
      <div>
      <div>
        <div>
          <h1 className="text-center">Users</h1>
          <Row>
            <Col><Link to="/users/add" className='btn btn-light my-3'>Add User</Link></Col>
          </Row>
            { loading ? <Loader /> :
              error ? <Message variant="danger">{error}</Message> :
              
              <Table striped bordered hover>
                <thead>
                  
                  <tr>
                    <th>Adm No:</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Ad</th>
                    <th>Tea</th>
                    <th>Acc</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                  
                <tbody>
                    
                  { users.map(user => (
                    <tr key={user.id}>
                      <td>{user.empId}</td>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.email}</td>
                      <td>
                        {
                          user.isAdmin ? <CheckOutlined /> : <CloseOutlined />
                        }
                      </td>
                      <td>{user.isTeacher ? <CheckOutlined /> : <CloseOutlined />}</td>
                      <td>{user.isAccountant ? <CheckOutlined /> : <CloseOutlined />}</td>
                      <td>
                        <Link to={`/users/${user.id}`}><EyeOutlined /></Link><span>  </span>
                        <Link to={`/users/${user.id}`}><EditOutlined /></Link><span>  </span>
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

export default UserList
