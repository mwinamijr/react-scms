import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  DesktopOutlined, FileOutlined, PieChartOutlined,
  TeamOutlined, UserOutlined, AppstoreOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { logout } from '../redux/actions/userActions'
import TopHead from '../components/TopHead'

const { Header, Content, Footer, Sider } = Layout;

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
  getItem('Finance', 'sub2', <TeamOutlined />, [
    getItem(<Link to="/finance/receipts">Receipts</Link>, '6'), 
    getItem(<Link to="/finance/payments">Payments</Link>, '8')
  ]),
  getItem('Navigation Two', 'sub3', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub4', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
  getItem('Logout', '13', <FileOutlined />),
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

  const logoutHandler = () => {
    dispatch(logout())
  }
  
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