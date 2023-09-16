import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Table } from 'react-bootstrap';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { listAccountants } from '../../redux/actions/userActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

function AccountantList() {
  
  const dispatch = useDispatch()

  const accountantList = useSelector(state => state.accountantList)
  const { loading, error, accountants } = accountantList

  useEffect(() => {
    dispatch(listAccountants())
    
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
          <h1 className="text-center">Accountants</h1>
            { loading ? <Loader /> :
              error ? <Message variant="danger">{error}</Message> :
              
              <Table striped bordered hover>
                <thead>
                  
                  <tr>
                    <th>Emp Id</th>
                    <th>Full Name</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                  
                <tbody>
                    
                  { accountants.map(accountant => (
                    <tr key={accountant.id}>
                      <td>{accountant.empId}</td>
                      <td>{accountant.user}</td>
                      <td>{accountant.salary}</td>
                      <td>
                        <Link to={`/users/accountants/${accountant.id}`}><EyeOutlined /></Link><span>  </span>
                        <Link to={`/users/accountants/${accountant.id}`}><EditOutlined /></Link><span>  </span>
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

export default AccountantList
