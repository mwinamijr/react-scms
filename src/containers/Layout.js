import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { logout } from '../redux/actions/userActions'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function DashLayout(props) {
  const [collapsed, setCollapsed] = useState(false)

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          { userInfo.user_type.isTeacher ?
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Students">
                <Menu.Item key="6"><Link to="/sis/students">Students</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/exams">Exams</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/results">Results</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" icon={<TeamOutlined />} title="Learn">
                <Menu.Item key="12"><Link to="/learn/assignments">Assignment</Link></Menu.Item>
                <Menu.Item key="13"><Link to="/exams">Exams</Link></Menu.Item>
                <Menu.Item key="14"><Link to="/results">Results</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="15" icon={<FileOutlined />}>
                Files
              </Menu.Item>
              <Menu.Item key="16" icon={<UserOutlined />}>
                <Link onClick={logoutHandler} to='/'>Logout</Link>
              </Menu.Item>
            </Menu>
            : userInfo.user_type.isAccountant ?
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Admission
              </Menu.Item>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Students">
                <Menu.Item key="6"><Link to="/sis/students">Students</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/exams">Exams</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/results">Results</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<TeamOutlined />} title="Finance">
                <Menu.Item key="9"><Link to="/receipts">Receipts</Link></Menu.Item>
                <Menu.Item key="10"><Link to="/payments">Payments</Link></Menu.Item>
                <Menu.Item key="11"><Link to="/reports">Reports</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="15" icon={<FileOutlined />}>
                Files
              </Menu.Item>
              <Menu.Item key="16" icon={<UserOutlined />}>
                <Link onClick={logoutHandler} to='/'>Logout</Link>
              </Menu.Item>
            </Menu>
            :
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Admission
              </Menu.Item>
              <SubMenu key="sub1" icon={<TeamOutlined />} title="Employees">
                <Menu.Item key="3"><Link to="/teachers">Teachers</Link></Menu.Item>
                <Menu.Item key="4">Accountants</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Students">
                <Menu.Item key="6"><Link to="/sis/students">Students</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/exams">Exams</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/results">Results</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<TeamOutlined />} title="Finance">
                <Menu.Item key="9"><Link to="/receipts">Receipts</Link></Menu.Item>
                <Menu.Item key="10"><Link to="/payments">Payments</Link></Menu.Item>
                <Menu.Item key="11"><Link to="/reports">Reports</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" icon={<TeamOutlined />} title="Learn">
                <Menu.Item key="12"><Link to="/learn/assignments">Assignment</Link></Menu.Item>
                <Menu.Item key="13"><Link to="/exams">Exams</Link></Menu.Item>
                <Menu.Item key="14"><Link to="/results">Results</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="15" icon={<FileOutlined />}>
                Files
              </Menu.Item>
              <Menu.Item key="16" icon={<UserOutlined />}>
                <Link onClick={logoutHandler} to='/'>Logout</Link>
              </Menu.Item>
            </Menu>
          }
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
            { props.children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Hayatul Islamiya ©2022 Created by Techdometz</Footer>
        </Layout>
      </Layout>
  )
}

export default DashLayout