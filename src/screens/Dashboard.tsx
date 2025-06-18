import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Space,
  message,
  Button,
  Select,
  List,
  Divider,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  DollarCircleOutlined,
  BookOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../app/hooks";

import { listStudents } from "../features/students/studentSlice";
import { listUsers } from "../features/user/userSlice";
import { listTeachers } from "../features/user/teacherSlice";
import { listAccountants } from "../features/user/accountantSlice";
import { listParents } from "../features/user/parentSlice";
import { listSubjects } from "../features/academic/subjectSlice";
import { listClassLevels } from "../features/academic/classLevelSlice";

import {
  updateCurrentTermDebts,
  updateAllMissingDebts,
  updatePastTermDebts,
} from "../features/finance/debtBulkActionSlice";
import { fetchTerms } from "../features/administration/termAndAcademicYearSlice";

export interface Term {
  id: number;
  name: string;
  display_name: string;
  academic_year: string;
  default_term_fee: number;
  start_date: string;
  end_date: string | null;
}

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loadingStates, setLoadingStates] = useState({
    students: false,
    users: false,
    teachers: false,
    accountants: false,
    parents: false,
    subjects: false,
    classLevels: false,
    terms: false,
  });

  const [bulkLoading, setBulkLoading] = useState(false);
  const [pastLoading] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [updatedStudents, setUpdatedStudents] = useState<string[]>([]);

  const allStudents = useSelector(
    (state: RootState) => state.getStudents?.students
  );
  const allTerms = useSelector(
    (state: RootState) => state.getTermsAndAcademicYears?.terms
  ); // Ensure terms are loaded
  const studentCount = allStudents?.length || 0;
  const teacherCount = useSelector(
    (state: RootState) => state.getTeachers?.teachers?.length || 0
  );
  const accountantCount = useSelector(
    (state: RootState) => state.getAccountants?.accountants?.length || 0
  );
  const parentCount = useSelector(
    (state: RootState) => state.getParents?.parents?.length || 0
  );
  const userCount = useSelector(
    (state: RootState) => state.getUsers?.users?.length || 0
  );
  const subjectCount = useSelector(
    (state: RootState) => state.getSubjects?.subjects?.length || 0
  );
  const classCount = useSelector(
    (state: RootState) => state.getClassLevels?.classLevels?.length || 0
  );

  useEffect(() => {
    const fetchData = async () => {
      const actions: [any, any, keyof typeof loadingStates][] = [
        [listStudents, undefined, "students"],
        [fetchTerms, undefined, "terms"],
        [listUsers, undefined, "users"],
        [listTeachers, undefined, "teachers"],
        [listAccountants, undefined, "accountants"],
        [listParents, undefined, "parents"],
        [listSubjects, undefined, "subjects"],
        [listClassLevels, undefined, "classLevels"],
      ];
      await Promise.all(
        actions.map(async ([action, params, name]) => {
          setLoadingStates((prev) => ({ ...prev, [name]: true }));
          try {
            const res = await dispatch(action(params));
            if (res.error) throw new Error(res.error.message);
          } catch (e: any) {
            message.error(`Failed to load ${name}: ${e.message}`);
          } finally {
            setLoadingStates((prev) => ({ ...prev, [name]: false }));
          }
        })
      );
    };
    fetchData();
  }, [dispatch]);

  const runUpdate = async (action: any, forPastTerm: boolean = false) => {
    setBulkLoading(true);
    setUpdatedStudents([]);
    try {
      const payload =
        forPastTerm && selectedTermId
          ? await dispatch(updatePastTermDebts([selectedTermId])).unwrap()
          : forPastTerm
          ? await dispatch(updateAllMissingDebts()).unwrap()
          : await dispatch(updateCurrentTermDebts()).unwrap();

      message.success(payload);
      // Optionally re-fetch student debt overview to get updated list
      if (selectedTermId && allStudents.length) {
        // Mock behavior: list of students updated could come from backend
        setUpdatedStudents(allStudents.map((s) => s.full_name ?? s.first_name));
      }
    } catch (e: any) {
      message.error(`Error: ${e}`);
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Dashboard</Title>

      <Row gutter={[16, 16]}>
        {[
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
        ].map((item, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={idx}>
            <Link to={item.link}>
              <Card hoverable>
                <Space size="large">
                  {item.icon}
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

      <Divider />

      <Card title="Debt Management">
        <Space direction="vertical">
          <Button
            type="primary"
            onClick={() => runUpdate(updateCurrentTermDebts)}
            loading={bulkLoading}
          >
            Update Current Term Debts
          </Button>

          <Button
            onClick={() => runUpdate(updateAllMissingDebts, true)}
            loading={bulkLoading}
          >
            Update All Missing Debts
          </Button>

          <Space>
            <Select
              placeholder="Select past term"
              style={{ width: 240 }}
              onChange={(val) => setSelectedTermId(val)}
              options={allTerms.map((t: Term) => ({
                label: t.display_name,
                value: t.id,
              }))}
              disabled={bulkLoading}
            />
            <Button
              type="default"
              onClick={() => runUpdate(updatePastTermDebts, true)}
              disabled={!selectedTermId || pastLoading}
              loading={pastLoading}
            >
              Update Selected Past Term
            </Button>
          </Space>
        </Space>

        {updatedStudents.length > 0 && (
          <>
            <Divider />
            <Title level={4}>Students Updated:</Title>
            <List
              dataSource={updatedStudents}
              renderItem={(name) => <List.Item>{name}</List.Item>}
              size="small"
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
