import React, { useState, useEffect, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  CalculatorOutlined,
  TeamOutlined,
  UserOutlined,
  FileExcelOutlined,
  FileDoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Grid } from "antd";
import type { MenuProps } from "antd";
import NotificationSection from "./header/NotificationSection";
import ProfileSection from "./header/ProfileSection";
import logo from "../assets/hayatul-logo.svg";

const { Content, Header, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const screens = useBreakpoint();

  const items: MenuItem[] = [
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
      getItem(
        <Link to="/finance/allocations">Allocations</Link>,
        "/finance/allocations"
      ),
      getItem(<Link to="/finance/payroll">Payroll</Link>, "/finance/payroll"),
      getItem("Reports", "finance/reports", undefined, [
        getItem("Collections", "/finance/reports/collections"),
        getItem("Invoices", "/finance/reports/invoices"),
      ]),
    ]),
    getItem("Academic", "academic", <TeamOutlined />, [
      getItem(
        <Link to="/academic/departments">Departments</Link>,
        "/academic/departments"
      ),
      getItem(
        <Link to="/academic/classLevels">Class Levels</Link>,
        "/academic/classLevels"
      ),
      getItem(
        <Link to="/academic/subjects">Subjects</Link>,
        "/academic/subjects"
      ),
    ]),
    getItem("Exam", "exam", <FileDoneOutlined />, [
      getItem("Setting", "exam/setting", undefined, [
        getItem("Exam groups", "/exam/setting/groups"),
        getItem("School exams", "/exam/setting/school"),
      ]),
      getItem("Reports", "exam/reports", undefined, [
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
    getItem(" School Calendar", "calendar", <CalendarOutlined />, [
      getItem(
        <Link to="/administration/school-events">School Events</Link>,
        "/administration/school-events"
      ),
      getItem(
        <Link to="/administration/school-calendar">Calendar</Link>,
        "/administration/school-calendar"
      ),
    ]),
  ];

  const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

  useEffect(() => {
    const parts = selectedKeys[0].split("/").slice(1, -1);
    const parentKey = parts.length > 0 ? parts.join("/") : "";
    setOpenKeys([parentKey]);
  }, [selectedKeys]);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  useEffect(() => {
    if (screens.md === false) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: "0 20px",
          background: "#2a4b8d",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={logo}
            alt="techdometz"
            style={{ height: 40, marginRight: 10 }}
          />
          <h1 style={{ color: "#fff", fontSize: "20px", margin: 0 }}>
            Tech HMS
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <NotificationSection />
          <ProfileSection />
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="md"
          collapsedWidth={80}
        >
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
          <Content style={{ margin: "16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Hayatul Islamiya © 2022 - {new Date().getFullYear()} Created by
            Techdometz
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
