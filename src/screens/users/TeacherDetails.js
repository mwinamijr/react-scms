import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getTeacherDetails } from "../../features/user/teacherSlice";

import {
  Card,
  Descriptions,
  Avatar,
  Breadcrumb,
  Tag,
  Typography,
  Button,
  Col,
  Row,
  Space,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const TeacherProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, teacher } = useSelector((state) => state.getTeachers);

  useEffect(() => {
    dispatch(getTeacherDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/users/teachers/" className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users/teachers/">Teachers</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Teacher Profile</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Teacher Profile">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : teacher ? (
          <div className="profile-container">
            {/* Profile Header */}

            <div className="profile-header">
              <Avatar
                size={120}
                src={teacher.image}
                icon={!teacher.image && <UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3} className="profile-name">
                {teacher.first_name} {teacher.middle_name} {teacher.last_name}
              </Title>
              <Text type="secondary" className="profile-username">
                @{teacher.username}
              </Text>

              <Row justify="center" className="profile-actions">
                <Col>
                  <Space>
                    <Link to={`/users/teachers/${id}/edit`}>
                      <Button type="primary">Edit Profile</Button>
                    </Link>

                    <Link to={`/users/teachers/${id}/print`}>
                      <Button type="default">Print Profile</Button>
                    </Link>
                  </Space>
                </Col>
              </Row>
            </div>

            {/* Basic Information */}
            <Descriptions title="Basic Information" bordered column={2}>
              <Descriptions.Item label="Full Name">
                {teacher.first_name} {teacher.middle_name} {teacher.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="Short Name">
                {teacher.short_name}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {teacher.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {teacher.date_of_birth}
              </Descriptions.Item>
              <Descriptions.Item label="National ID">
                {teacher.national_id}
              </Descriptions.Item>
              <Descriptions.Item label="TIN Number">
                {teacher.tin_number}
              </Descriptions.Item>
              <Descriptions.Item label="NSSF Number">
                {teacher.nssf_number}
              </Descriptions.Item>
            </Descriptions>

            {/* Contact Information */}
            <Descriptions
              title="Contact Information"
              bordered
              column={2}
              className="mt-3"
            >
              <Descriptions.Item label="Email">
                <MailOutlined /> {teacher.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {teacher.phone_number || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Alternative Email">
                {teacher.alt_email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {teacher.address || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            {/* Employment & Salary Details */}
            <Descriptions
              title="Employment & Salary Details"
              bordered
              column={2}
              className="mt-3"
            >
              <Descriptions.Item label="Employee ID">
                {teacher.empId}
              </Descriptions.Item>
              <Descriptions.Item label="Designation">
                {teacher.designation || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Salary">
                <DollarCircleOutlined />{" "}
                {teacher.salary ? `$${teacher.salary}` : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Unpaid Salary">
                <DollarCircleOutlined style={{ color: "red" }} /> $
                {teacher.unpaid_salary}
              </Descriptions.Item>
            </Descriptions>

            {/* Subject Specialization */}
            <Card title="Subject Specialization" className="mt-3">
              {teacher.subject_specialization_display.length > 0 ? (
                teacher.subject_specialization_display.map((subject, index) => (
                  <Tag color="blue" key={index}>
                    {subject}
                  </Tag>
                ))
              ) : (
                <Text>No subjects assigned</Text>
              )}
            </Card>
          </div>
        ) : (
          <Message variant="info">No teacher found</Message>
        )}
      </Card>

      <Card title="Payments History" className="mt-3" loading={loading}>
        {teacher?.payments?.length > 0 ? (
          <table className="payment-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {teacher.payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>${payment.amount}</td>
                  <td>
                    <Tag color={payment.status === "Paid" ? "green" : "red"}>
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
    </div>
  );
};

export default TeacherProfile;
