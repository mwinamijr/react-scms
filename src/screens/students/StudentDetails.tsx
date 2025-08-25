import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store"; // adjust path to your store
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { studentDetails } from "../../features/students/studentSlice";
import { listStudentReceipts } from "../../features/finance/receiptSlice";

import {
  Card,
  Descriptions,
  Avatar,
  Typography,
  Button,
  Col,
  Row,
  Space,
  Tag,
  Table,
  Breadcrumb,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../app/hooks";

const { Title, Text } = Typography;

interface PersonName {
  first_name: string;
  middle_name?: string;
  last_name: string;
}

interface Sibling extends PersonName {
  id: number;
  full_name: string;
  class_level: string;
}

interface Receipt {
  id: number;
  date: string;
  amount: number;
  status: "pending" | "paid" | string;
  paid_for_details?: {
    name: string;
  };
}

function getFullName(person: PersonName): string {
  return [person.first_name, person.middle_name, person.last_name]
    .filter(Boolean)
    .join(" ");
}

const StudentDetailsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { loading, error, student } = useSelector(
    (state: RootState) => state.getStudents
  );
  const {
    loading: receiptLoading,
    error: receiptError,
    studentReceipts,
  } = useSelector((state: RootState) => state.getReceipts);

  useEffect(() => {
    if (id) {
      dispatch(studentDetails(Number(id)));
      dispatch(listStudentReceipts(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/sis/students/">Students</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student Details</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Student Profile">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : student ? (
          <div className="profile-container">
            <div className="profile-header">
              <Avatar
                size={120}
                src={student?.image}
                icon={!student?.image && <UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3}>
                {student.first_name} {student.middle_name} {student.last_name}
              </Title>{" "}
              <Text type="secondary">
                Admission #: {student.admission_number}
              </Text>
              <br />
              <Text type="secondary">PREMS #: {student.prems_number}</Text>
              <Row justify="center" className="profile-actions">
                <Col>
                  <Space>
                    <Link to={`/sis/students/${id}/edit`}>
                      <Button type="primary">Edit Profile</Button>
                    </Link>
                    <Link to={`/sis/students/${id}/print`}>
                      <Button type="default">Print Profile</Button>
                    </Link>
                  </Space>
                </Col>
              </Row>
            </div>

            <Descriptions title="Basic Information" bordered column={2}>
              <Descriptions.Item label="Full Name">
                {student.first_name} {student.middle_name} {student.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {student.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {student.date_of_birth}
              </Descriptions.Item>
              <Descriptions.Item label="Religion">
                {student.religion || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title="Previous Academic Information"
              bordered
              column={2}
            >
              <Descriptions.Item label="Primary School">
                {student.primary_school_name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Graduation Year">
                {student.primary_school_completion_year || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Primary School Number">
                {student.primary_school_number || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Grade">
                {student.primary_school_grade || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Academic Information" bordered column={2}>
              <Descriptions.Item label="Class Level">
                {student.class_level_display}
              </Descriptions.Item>
              <Descriptions.Item label="Class of Year">
                {student.class_of_year_display || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Admission Date">
                {student.admission_date}
              </Descriptions.Item>
              <Descriptions.Item label="Graduation Date">
                {student.graduation_date
                  ? new Date(student.graduation_date).toLocaleDateString()
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Date Dismissed">
                {student.date_dismissed
                  ? new Date(student.date_dismissed).toLocaleDateString()
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Reason Left">
                {student.reason_left || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Contact Information" bordered column={2}>
              <Descriptions.Item label="Parent/Guardian">
                {student.parent_guardian_display}
              </Descriptions.Item>
              <Descriptions.Item label="Parent Contact">
                <PhoneOutlined /> {student.parent_contact || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined /> {student.region}, {student.city},{" "}
                {student.street || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Financial Information" bordered column={2}>
              <Descriptions.Item label="Debt">
                <DollarCircleOutlined
                  style={{ color: student?.debt > 0 ? "red" : "green" }}
                />{" "}
                ${student.debt}
              </Descriptions.Item>
              <Descriptions.Item label="Cache GPA">
                {student.cache_gpa || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Card title="Siblings" className="mt-3">
              {student.siblings && student.siblings.length > 0 ? (
                <Table
                  dataSource={student.siblings}
                  columns={[
                    {
                      title: "Full Name",
                      key: "fullName",
                      render: (_, record: Sibling) => getFullName(record),
                    },
                    {
                      title: "Class Level",
                      key: "classLevel",
                      render: (_, record: Sibling) => record.class_level,
                    },
                  ]}
                  rowKey="id"
                  onRow={(record) => ({
                    onClick: () =>
                      navigate(`/sis/students/${(record as Sibling).id}`),
                    style: { cursor: "pointer" },
                  })}
                />
              ) : (
                <Text>No siblings available.</Text>
              )}
            </Card>

            <Card title="Payments History" className="mt-3">
              {receiptError && (
                <Message variant="danger">{receiptError}</Message>
              )}
              {studentReceipts && studentReceipts.length > 0 ? (
                <Table
                  dataSource={studentReceipts}
                  columns={[
                    {
                      title: "Date",
                      dataIndex: "date",
                      key: "date",
                    },
                    {
                      title: "Description",
                      key: "description",
                      render: (_, record: Receipt) =>
                        record.paid_for_details?.name || "N/A",
                    },
                    {
                      title: "Amount Paid",
                      key: "amount",
                      render: (_, record: Receipt) =>
                        `TSH ${record.amount.toLocaleString()}`,
                    },
                    {
                      title: "Status",
                      dataIndex: "status",
                      key: "status",
                      render: (status: string) => (
                        <Tag color={status === "pending" ? "orange" : "green"}>
                          {status}
                        </Tag>
                      ),
                    },
                  ]}
                  loading={receiptLoading}
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  onRow={(record) => ({
                    onClick: () =>
                      navigate(`/finance/receipts/${(record as Receipt).id}`),
                    style: { cursor: "pointer" },
                  })}
                />
              ) : (
                <Text>No payments found</Text>
              )}
            </Card>

            <Card title="Attendance & Examination Records" className="mt-3">
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Total Attendance">
                  {"N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Examination Score">
                  <BookOutlined /> {"N/A"}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
        ) : (
          <Message variant="info">No student found</Message>
        )}
      </Card>
    </div>
  );
};

export default StudentDetailsScreen;
