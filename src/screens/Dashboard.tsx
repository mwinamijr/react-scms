import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store"; // Adjust path as needed
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
import { useAppDispatch } from "../app/hooks";

const { Title } = Typography;

interface LoadingStates {
  students: boolean;
  users: boolean;
  teachers: boolean;
  accountants: boolean;
  parents: boolean;
  subjects: boolean;
  classLevels: boolean;
}

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({
    students: false,
    users: false,
    teachers: false,
    accountants: false,
    parents: false,
    subjects: false,
    classLevels: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const dispatchWithTracking = async (
        action: any,
        params: any,
        name: keyof LoadingStates
      ) => {
        setLoadingStates((prev) => ({ ...prev, [name]: true }));
        try {
          const resultAction = await dispatch(action(params));
          if (resultAction.error) {
            throw new Error(
              resultAction.error.message || `Failed to fetch ${name}`
            );
          }
          return resultAction.payload;
        } catch (error: any) {
          message.error(`Failed to load ${name}: ${error.message}`);
          return null;
        } finally {
          setLoadingStates((prev) => ({ ...prev, [name]: false }));
        }
      };

      await Promise.all([
        dispatchWithTracking(listStudents, undefined, "students"),
        dispatchWithTracking(listUsers, undefined, "users"),
        dispatchWithTracking(listTeachers, {}, "teachers"),
        dispatchWithTracking(listAccountants, {}, "accountants"),
        dispatchWithTracking(listParents, undefined, "parents"),
        dispatchWithTracking(listSubjects, {}, "subjects"),
        dispatchWithTracking(listClassLevels, {}, "classLevels"),
      ]);
    };

    fetchData();
  }, [dispatch]);

  const studentCount = useSelector(
    (state: RootState) => state.getStudents?.students?.length || 0
  );
  const userCount = useSelector(
    (state: RootState) => state.getUsers?.users?.length || 0
  );
  const teacherCount = useSelector(
    (state: RootState) => state.getTeachers?.teachers?.length || 0
  );
  const accountantCount = useSelector(
    (state: RootState) => state.getAccountants?.accountants?.length || 0
  );
  const parentCount = useSelector(
    (state: RootState) => state.getParents?.parents?.length || 0
  );
  const subjectCount = useSelector(
    (state: RootState) => state.getSubjects?.subjects?.length || 0
  );
  const classCount = useSelector(
    (state: RootState) => state.getClassLevels?.classLevels?.length || 0
  );

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
