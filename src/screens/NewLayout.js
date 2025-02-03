import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
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
import { Layout, Menu, Grid } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/user/userSlice"; // Import the logout action
import TopHead from "../components/TopHead";

const { Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid; // For responsive behavior

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
  const screens = useBreakpoint(); // Access responsive breakpoints

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/"); // Redirect to home screen after logout
  };

  // Menu items
  const items = [
    getItem(
      <Link to="/dashboard">Dashboard</Link>,
      "/dashboard",
      <PieChartOutlined />
    ),
    getItem("Admission", "/admission", <DesktopOutlined />),
    getItem(
      <Link to="/sis/students">Students</Link>,
      "/sis/students",
      <UserOutlined />
    ),
    getItem("Users", "users", <TeamOutlined />, [
      getItem(
        <Link to="/users/accountants">Accountants</Link>,
        "/users/accountants"
      ),
      getItem(<Link to="/users/teachers">Teachers</Link>, "/users/teachers"),
      getItem(<Link to="/users/parents">Parents</Link>, "/users/parents"),
      getItem(<Link to="/users">Users</Link>, "/users"),
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

  // Automatically collapse sidebar on small screens
  useEffect(() => {
    if (screens.md === false) {
      setCollapsed(true); // Collapse only on small screens
    } else {
      setCollapsed(false); // Ensure it stays open on larger screens
    }
  }, [screens]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md" // Auto-collapse on small screens
        collapsedWidth={80} // Minimize sidebar width
      >
        <div
          style={{
            height: 32,
            margin: 16,
            color: "white",
            fontSize: collapsed ? "100%" : "120%",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          {collapsed ? "HISMS" : "Hayatul SIMS"}
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <TopHead style={{ float: "right" }} />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {props.children}
          </div>
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
