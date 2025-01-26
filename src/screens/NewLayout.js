import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  CalculatorOutlined,
  UserDeleteOutlined,
  TeamOutlined,
  UserOutlined,
  FileExcelOutlined,
  FileDoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/user/userSlice"; // Import the logout action
import TopHead from "../components/TopHead";

const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, onClick = null) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

const DashLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]); // Track open submenus
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location

  // Access userInfo from the user slice
  const { userInfo } = useSelector((state) => state.getUsers);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login page if user is logged out
    }
  }, [userInfo, navigate]);

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  // Menu items
  const items = [
    getItem(<Link to="/">Dashboard</Link>, "/", <PieChartOutlined />),
    getItem("Admission", "/admission", <DesktopOutlined />),
    getItem(
      <Link to="/sis/students">Students</Link>,
      "/sis/students",
      <UserOutlined />
    ),
    getItem("Employees", "employees", <TeamOutlined />, [
      getItem(<Link to="/users">Users</Link>, "/users"),
      getItem(<Link to="/users/teachers">Teachers</Link>, "/users/teachers"),
      getItem(
        <Link to="/users/accountants">Accountants</Link>,
        "/users/accountants"
      ),
    ]),
    getItem("Finance", "finance", <CalculatorOutlined />, [
      getItem(
        <Link to="/finance/receipts">Receipts</Link>,
        "/finance/receipts"
      ),
      getItem(
        <Link to="/finance/payments">Payments</Link>,
        "/finance/payments"
      ),
      getItem(<Link to="/finance/payroll">Payroll</Link>, "/finance/payroll"),
      getItem("Reports", "finance/reports", null, [
        getItem("Collections", "/finance/reports/collections"),
        getItem("Invoices", "/finance/reports/invoices"),
      ]),
    ]),
    getItem("Exam", "exam", <FileDoneOutlined />, [
      getItem("Setting", "exam/setting", null, [
        getItem("Exam groups", "/exam/setting/groups"),
        getItem("School exams", "/exam/setting/school"),
      ]),
      getItem("Reports", "exam/reports", null, [
        getItem("Single Report", "/exam/reports/single"),
        getItem("Combined reports", "/exam/reports/combined"),
        getItem("CA Report", "/exam/reports/ca"),
      ]),
      getItem("Exam Schedule", "/exam/schedule"),
    ]),
    getItem("Teaching Records", "teachingR", <FileDoneOutlined />, [
      getItem("Schemes", "/teachingR/schemes"),
      getItem("Subject Teachers", "/teachingR/teachers"),
      getItem("Class Journals", "/teachingR/journals"),
    ]),
    getItem("Attendance", "attendance", <FileExcelOutlined />, [
      getItem("Student Attendance", "/attendance/students"),
      getItem("Employee Attendance", "/attendance/employees"),
      getItem("Attendance report", "/attendance/reports"),
    ]),
    getItem("Email / SMS", "email", <MailOutlined />, [
      getItem(<Link to="/notification/sms">SMS</Link>, "/notification/sms"),
      getItem("Compose", "/notification/compose"),
    ]),
    getItem("School Calendar", "/calendar", <CalendarOutlined />),
    getItem("Logout", "logout", <UserDeleteOutlined />, null, logoutHandler),
  ];

  // Memoize selectedKeys based on the current location
  const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

  // Automatically open the parent menu of the active menu item
  useEffect(() => {
    const parentKeys = selectedKeys[0].split("/").slice(1, -1).join("/");
    setOpenKeys([parentKeys || ""]);
  }, [selectedKeys]);

  // Handle submenu open/close events to allow only one open submenu
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
          className="text-center"
        >
          <span style={{ color: "white", fontSize: "120%" }}>HISMS</span>
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys} // Highlight active menu item
          openKeys={openKeys} // Control which submenus are open
          onOpenChange={onOpenChange} // Handle submenu open/close
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <TopHead style={{ float: "right" }} />
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, minHeight: 360 }}>{props.children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Hayatul Islamiya © 2022 - {new Date().getFullYear()} Created by
          Techdometz
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashLayout;
