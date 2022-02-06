import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class DashboardLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Admission
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Employees">
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
            <Menu.Item key="16" icon={<FileOutlined />}>
              <Link to={'/logout'}>Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
            { this.props.children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardLayout;