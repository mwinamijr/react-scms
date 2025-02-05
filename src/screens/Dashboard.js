import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Typography, Statistic, Space } from "antd";
import {
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { listUsers } from "../features/user/userSlice";
import { listStudents } from "../features/students/studentSlice";
import { listTeachers } from "../features/user/teacherSlice";
import { listAccountants } from "../features/user/accountantSlice";
import { listParents } from "../features/user/parentSlice";
import { listSubjects } from "../features/academic/subjectSlice";
import { listClassLevels } from "../features/academic/classLevelSlice";

const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetch data on mount
  useEffect(() => {
    dispatch(listStudents());
    dispatch(listUsers());
    dispatch(listTeachers());
    dispatch(listAccountants());
    dispatch(listParents());
    dispatch(listSubjects());
    dispatch(listClassLevels());
  }, [dispatch]);

  // Get Redux state and extract counts
  const studentCount = useSelector(
    (state) => state.getStudents?.students?.length || 0
  );
  const userCount = useSelector((state) => state.getUsers?.users?.length || 0);
  const teacherCount = useSelector(
    (state) => state.getTeachers?.teachers?.length || 0
  );
  const accountantCount = useSelector(
    (state) => state.getAccountants?.accountants?.length || 0
  );
  const parentCount = useSelector(
    (state) => state.getParents?.parents?.length || 0
  );
  const subjectCount = useSelector(
    (state) => state.getSubjects?.subjects?.length || 0
  );
  const classCount = useSelector(
    (state) => state.getClassLevels?.classLevels?.length || 0
  );

  // Dashboard cards data
  const dashboardData = [
    {
      title: "Students",
      count: studentCount,
      icon: <UserOutlined />,
      link: "/sis/students",
    },
    {
      title: "Teachers",
      count: teacherCount,
      icon: <TeamOutlined />,
      link: "/users/teachers",
    },
    {
      title: "Parents",
      count: parentCount,
      icon: <SolutionOutlined />,
      link: "/users/parents",
    },
    {
      title: "Accountants",
      count: accountantCount,
      icon: <DollarCircleOutlined />,
      link: "/users/accountants",
    },
    {
      title: "Users",
      count: userCount,
      icon: <UserOutlined />,
      link: "/users",
    },
    {
      title: "Subjects",
      count: subjectCount,
      icon: <BookOutlined />,
      link: "/academic/subjects",
    },
    {
      title: "Classes",
      count: classCount,
      icon: <FileTextOutlined />,
      link: "/academic/classes",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} className="mb-4">
        Dashboard
      </Title>
      <Row gutter={[16, 16]}>
        {dashboardData.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Link to={item.link}>
              <Card hoverable className="dashboard-card">
                <Space size="large">
                  <span className="dashboard-icon">{item.icon}</span>
                  <Statistic title={item.title} value={item.count} />
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
