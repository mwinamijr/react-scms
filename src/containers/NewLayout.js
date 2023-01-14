import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  DesktopOutlined, MailOutlined, PieChartOutlined, CalculatorOutlined, UserDeleteOutlined,
  TeamOutlined, UserOutlined, FileExcelOutlined, FileDoneOutlined, CalendarOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

//import { logout } from '../redux/actions/userActions'
import TopHead from '../components/TopHead'

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem('Admission', '2', <DesktopOutlined />),
  getItem(<Link to="/sis/students">Students</Link>, '3', <UserOutlined />),
  getItem('Employees', 'sub1', <TeamOutlined />, [
    getItem(<Link to="/teachers">Teachers</Link>, '4'),
    getItem('Accountants', '5'),
  ]),
  getItem('Finance', 'sub2', <CalculatorOutlined />, [
    getItem(<Link to="/finance/receipts">Receipts</Link>, '6'), 
    getItem(<Link to="/finance/payments">Payments</Link>, '24'),
    getItem(<Link to="/finance/payments">Payroll</Link>, '25'),
    getItem('Reports', 'sub9', null, [
      getItem('Collections', '26'),
      getItem('Invoices', '27')
    ]),
  ]),
  getItem('Exam', 'sub5', <FileDoneOutlined />, [
    getItem('Setting', 'sub6', null, [getItem('Exam groups', '15'), getItem('School exams', '16')]),
    getItem('Reports', 'sub7', null, [
      getItem('Single Report', '17'), 
      getItem('Combined reports', '18'),
      getItem('CA Report', '20'),
    ]),
    getItem('Exam Schedule', '19'),
  ]),
  getItem('Attendance', 'sub8', <FileExcelOutlined />, [
    getItem('Student Attendance', '21'),
    getItem('Employee Attendance', '22'),
    getItem('Attendance report', '23'),
  ]),
  getItem('Email / SMS', 'sub3', <MailOutlined />, [
    getItem(<Link to="/notification/sms">SMS</Link>, '9'),
    getItem('Compose', '10'),
    getItem('Submenu', 'sub4', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
  getItem('School calender', '28', <CalendarOutlined />),
  getItem('Logout', '13', <UserDeleteOutlined />),
];


const DashLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch()
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
    }
  }, [userInfo,])

  /*
  const logoutHandler = () => {
    dispatch(logout())
  }
  */

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', }}
        
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
      <TopHead style={{ float: 'right'}} />
        <Content style={{margin: '0 16px', }}>
          <div style={{ padding: 24, minHeight: 360, }}>
            { props.children }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center',  }}>
        Hayatul Islamiya ©2022 Created by Techdometz
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashLayout