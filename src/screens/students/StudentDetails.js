import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { studentDetails } from "../../features/students/studentSlice";

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
  const { id } = useParams();
  const { loading, error, student } = useSelector((state) => state.getStudents);

  useEffect(() => {
    dispatch(studentDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/sis/students/" className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>

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
                {student.first_name} {student.middle_name} {student.last_name}
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
              <Descriptions.Item label="Blood Group">
                {student.blood_group || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Academic Information */}
            <Descriptions title="Academic Information" bordered column={2}>
              <Descriptions.Item label="Class Level">
                {student.class_level}
              </Descriptions.Item>
              <Descriptions.Item label="Class of Year">
                {student.class_of_year || "N/A"}
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
                {student.parent_guardian}
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
                <table className="table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.siblings.map((sibling) => (
                      <tr key={sibling.id}>
                        <td>
                          {sibling.first_name} {sibling.middle_name}{" "}
                          {sibling.last_name}
                        </td>
                        <td>{sibling.class_level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <Text>No siblings available.</Text>
              )}
            </Card>

            {/* Payments History */}
            <Card title="Payments History" className="mt-3">
              {student.payments && student.payments.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{new Date(payment.date).toLocaleDateString()}</td>
                        <td>${payment.amount}</td>
                        <td>
                          <Tag
                            color={payment.status === "Paid" ? "green" : "red"}
                          >
                            {payment.status}
                          </Tag>
                        </td>
                        <td>{payment.description || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
