import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Table } from 'react-bootstrap';
import Loader from './../../components/Loader';
import Message from './../../components/Message';
import { listTeachers, listAccountants} from './../../redux/actions/userActions'

function Payroll() {
  
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const teacherList = useSelector(state => state.teacherList)
  const { teacherLoading, teacherError, teachers } = teacherList
  const accountantList = useSelector(state => state.accountantList)
  const { accountantLoading, accountantError, accountants } = accountantList

  useEffect(() => {
    dispatch(listTeachers())
    dispatch(listAccountants())
    
}, [dispatch,])


    return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Payroll</Breadcrumb.Item>
      </Breadcrumb>
    <div>
    <div>
      { userInfo.isAccountant || userInfo.isAdmin ?
        <div>
          <h1 className="text-center">Payroll</h1>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Emp Id</th>
                  <th>Full Name</th>
                  <th>TIN Number</th>
                  <th>NSSF Number</th>
                  <th>Salary</th>
                  <th>NSSF cut</th>
                </tr>
              </thead>
                
              { teacherLoading ? <Loader /> :
                teacherError ? <Message variant="danger">{teacherError}</Message> :
                <tbody>
                  { teachers.map(teacher => (
                    <tr key={teacher.id}>
                      <td>{teacher.empId}</td>
                      <td>{teacher.user}</td>
                      <td>{teacher.tin_number}</td>
                      <td>{teacher.nssf_number}</td>
                      <td>{teacher.salary}</td>
                      <td>{teacher.salary * 10/100}</td>
                    </tr>
                  ))}
              </tbody>
              }
              { accountantLoading ? <Loader /> :
                accountantError ? <Message variant="danger">{accountantError}</Message> :
                <tbody>
                  { accountants.map(accountant => (
                    <tr key={accountant.id}>
                      <td>{accountant.empId}</td>
                      <td>{accountant.user}</td>
                      <td>{accountant.tin_number}</td>
                      <td>{accountant.nssf_number}</td>
                      <td>{accountant.salary}</td>
                      <td>{accountant.salary * 10/100}</td>
                    </tr>
                  ))}
              </tbody>
              }
            </Table>
            
        </div>
      :
        <Message>You are no authorized to view this page. Please contact the Admin for further details</Message>
      }
    </div>
    </div>
    </div>
  )
}

export default Payroll