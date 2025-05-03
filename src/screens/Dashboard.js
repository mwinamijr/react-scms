import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Typography, Statistic, Space, message } from "antd";
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
  const [loadingStates, setLoadingStates] = useState({
    students: false,
    users: false,
    teachers: false,
    accountants: false,
    parents: false,
    subjects: false,
    classLevels: false,
  });

  // Fetch data on mount with proper parameters
  useEffect(() => {
    const fetchData = async () => {
      // Helper function to track and log dispatch results
      const dispatchWithTracking = async (action, params, name) => {
        //console.log(`Starting to fetch ${name}...`);
        setLoadingStates((prev) => ({ ...prev, [name]: true }));

        try {
          const resultAction = await dispatch(action(params));
          //console.log(`${name} fetch result:`, resultAction);

          if (resultAction.error) {
            throw new Error(
              resultAction.error.message || `Failed to fetch ${name}`
            );
          }

          //console.log(`Successfully fetched ${name}`);
          return resultAction.payload;
        } catch (error) {
          //console.error(`Error fetching ${name}:`, error);
          message.error(`Failed to load ${name}: ${error.message}`);
          return null;
        } finally {
          setLoadingStates((prev) => ({ ...prev, [name]: false }));
        }
      };

      // Dispatch all actions with empty search parameters
      await Promise.all([
        dispatchWithTracking(listStudents, "students"),
        dispatchWithTracking(listUsers, "users"),
        dispatchWithTracking(listTeachers, {}, "teachers"),
        dispatchWithTracking(listAccountants, {}, "accountants"),
        dispatchWithTracking(listParents, "parents"),
        dispatchWithTracking(listSubjects, {}, "subjects"),
        dispatchWithTracking(listClassLevels, {}, "classLevels"),
      ]);
    };

    fetchData();
  }, [dispatch]);

  // Get Redux state with proper null checking
  const studentCount = useSelector((state) => {
    //console.log("Student state:", state.getStudents);
    return state.getStudents?.students?.length || 0;
  });

  const userCount = useSelector((state) => {
    //console.log("User state:", state.getUsers);
    return state.getUsers?.users?.length || 0;
  });

  const teacherCount = useSelector((state) => {
    //console.log("Teacher state:", state.getTeachers);
    return state.getTeachers?.teachers?.length || 0;
  });

  const accountantCount = useSelector((state) => {
    //console.log("Accountant state:", state.getAccountants);
    return state.getAccountants?.accountants?.length || 0;
  });

  const parentCount = useSelector((state) => {
    //console.log("Parent state:", state.getParents);
    return state.getParents?.parents?.length || 0;
  });

  const subjectCount = useSelector((state) => {
    //console.log("Subject state:", state.getSubjects);
    return state.getSubjects?.subjects?.length || 0;
  });

  const classCount = useSelector((state) => {
    //console.log("Class state:", state.getClassLevels);
    return state.getClassLevels?.classLevels?.length || 0;
  });

  // Dashboard cards data
  const dashboardData = [
    {
      title: "Students",
      count: studentCount,
      icon: <UserOutlined />,
      link: "/sis/students",
      loading: loadingStates.students,
    },
    {
      title: "Teachers",
      count: teacherCount,
      icon: <TeamOutlined />,
      link: "/users/teachers",
      loading: loadingStates.teachers,
    },
    {
      title: "Parents",
      count: parentCount,
      icon: <SolutionOutlined />,
      link: "/users/parents",
      loading: loadingStates.parents,
    },
    {
      title: "Accountants",
      count: accountantCount,
      icon: <DollarCircleOutlined />,
      link: "/users/accountants",
      loading: loadingStates.accountants,
    },
    {
      title: "Users",
      count: userCount,
      icon: <UserOutlined />,
      link: "/users",
      loading: loadingStates.users,
    },
    {
      title: "Subjects",
      count: subjectCount,
      icon: <BookOutlined />,
      link: "/academic/subjects",
      loading: loadingStates.subjects,
    },
    {
      title: "Classes",
      count: classCount,
      icon: <FileTextOutlined />,
      link: "/academic/classes",
      loading: loadingStates.classLevels,
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
                  <Statistic
                    title={item.title}
                    value={item.count}
                    loading={item.loading}
                  />
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
