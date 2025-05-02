import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { studentDetails } from "../../features/students/studentSlice";
import { listStudentReceipts } from "../../features/finance/financeSlice";

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
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const StudentDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, student } = useSelector((state) => state.getStudents);
  const {
    loading: receiptLoading,
    error: receiptError,
    studentReceipts,
  } = useSelector((state) => state.getFinance);

  useEffect(() => {
    dispatch(studentDetails(id));
    dispatch(listStudentReceipts(id));
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
            {/* Profile Header */}
            <div className="profile-header">
              <Avatar
                size={120}
                src={student.image}
                icon={!student.image && <UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3} className="profile-name">
                {student.full_name}
              </Title>
              <Text type="secondary" className="profile-username">
                Admission #: {student.admission_number}
              </Text>

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

            {/* Basic Information */}
            <Descriptions title="Basic Information" bordered column={2}>
              <Descriptions.Item label="Full Name">
                {student.full_name}
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
              <Descriptions.Item label="Blood Group">
                {student.blood_group || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Academic Information */}
            <Descriptions title="Academic Information" bordered column={2}>
              <Descriptions.Item label="Class Level">
                {student.class_level_display}
              </Descriptions.Item>
              <Descriptions.Item label="Class of Year">
                {student.class_of_year_display || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Admission Date">
                {student.admission_date
                  ? new Date(student.admission_date).toLocaleDateString()
                  : "N/A"}
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

            {/* Contact Information */}
            <Descriptions title="Contact Information" bordered column={2}>
              <Descriptions.Item label="Parent/Guardian">
                {student.parent_guardian_display}
              </Descriptions.Item>
              <Descriptions.Item label="Parent Contact">
                <PhoneOutlined /> {student.parent_contact || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined /> {student.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <HomeOutlined /> {student.region}, {student.city},{" "}
                {student.street || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Financial Information */}
            <Descriptions title="Financial Information" bordered column={2}>
              <Descriptions.Item label="Debt">
                <DollarCircleOutlined
                  style={{ color: student.debt > 0 ? "red" : "green" }}
                />{" "}
                ${student.debt}
              </Descriptions.Item>
              <Descriptions.Item label="Cache GPA">
                {student.cache_gpa || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Sibling Information */}
            <Card title="Siblings" className="mt-3">
              {student.siblings && student.siblings.length > 0 ? (
                <Table
                  dataSource={student.siblings}
                  columns={[
                    {
                      title: "Full Name",
                      dataIndex: ["student"],
                      key: "fullName",
                      render: (_, record) => record?.full_name || "N/A",
                    },
                    {
                      title: "Class Level",
                      dataIndex: ["class_level"],
                      key: "class_level",
                      render: (_, record) => record?.class_level || "N/A",
                    },
                  ]}
                  rowKey="id"
                  onRow={(record) => ({
                    onClick: () => navigate(`/sis/students/${record.id}`),
                    style: { cursor: "pointer" },
                  })}
                />
              ) : (
                <Text>No siblings available.</Text>
              )}
            </Card>

            {/* Payments History */}
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
                      dataIndex: ["date"],
                      key: "date",
                      render: (_, record) => record?.date || "N/A",
                    },
                    {
                      title: "Description",
                      dataIndex: ["student", "description"],
                      key: "description",
                      render: (_, record) =>
                        record?.paid_for_details?.name || "N/A",
                    },
                    {
                      title: "Amount Paid",
                      dataIndex: ["student", "price"],
                      key: "amount",
                      render: (_, record) =>
                        `TSH ${record?.amount?.toLocaleString()}` || "N/A",
                    },
                    {
                      title: "Status",
                      dataIndex: "status",
                      key: "status",
                      render: (status) => (
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
                    onClick: () => navigate(`/finance/receipts/${record.id}`),
                    style: { cursor: "pointer" },
                  })}
                />
              ) : (
                <Text>No payments found</Text>
              )}
            </Card>

            {/* Attendance & Examination Records */}
            <Card title="Attendance & Examination Records" className="mt-3">
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Total Attendance">
                  {student.attendance_count || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Examination Score">
                  <BookOutlined /> {student.exam_score || "N/A"}
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
