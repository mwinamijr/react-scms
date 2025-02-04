import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getAccountantDetails } from "../../features/user/accountantSlice";

import {
  Card,
  Descriptions,
  Avatar,
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

const AccountantProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, accountant } = useSelector(
    (state) => state.getAccountants
  );

  useEffect(() => {
    dispatch(getAccountantDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/users/accountants/" className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>

      <Card title="Accountant Profile">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : accountant ? (
          <div className="profile-container">
            {/* Profile Header */}

            <div className="profile-header">
              <Avatar
                size={120}
                src={accountant.image}
                icon={!accountant.image && <UserOutlined />}
                className="profile-avatar"
              />
              <Title level={3} className="profile-name">
                {accountant.first_name} {accountant.middle_name}{" "}
                {accountant.last_name}
              </Title>
              <Text type="secondary" className="profile-username">
                @{accountant.username}
              </Text>

              <Row justify="center" className="profile-actions">
                <Col>
                  <Space>
                    <Link to={`/users/accountants/${id}/edit`}>
                      <Button type="primary">Edit Profile</Button>
                    </Link>

                    <Link to={`/users/accountants/${id}/print`}>
                      <Button type="default">Print Profile</Button>
                    </Link>
                  </Space>
                </Col>
              </Row>
            </div>

            {/* Basic Information */}
            <Descriptions title="Basic Information" bordered column={2}>
              <Descriptions.Item label="Full Name">
                {accountant.first_name} {accountant.middle_name}{" "}
                {accountant.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {accountant.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {accountant.date_of_birth}
              </Descriptions.Item>
              <Descriptions.Item label="National ID">
                {accountant.national_id}
              </Descriptions.Item>
              <Descriptions.Item label="TIN Number">
                {accountant.tin_number}
              </Descriptions.Item>
              <Descriptions.Item label="NSSF Number">
                {accountant.nssf_number}
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
                <MailOutlined /> {accountant.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined /> {accountant.phone_number || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Alternative Email">
                {accountant.alt_email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {accountant.address || "N/A"}
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
                {accountant.empId}
              </Descriptions.Item>
              <Descriptions.Item label="Designation">
                {accountant.designation || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Salary">
                <DollarCircleOutlined />{" "}
                {accountant.salary ? `$${accountant.salary}` : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Unpaid Salary">
                <DollarCircleOutlined style={{ color: "red" }} /> $
                {accountant.unpaid_salary}
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <Message variant="info">No accountant found</Message>
        )}
      </Card>

      <Card title="Payments History" className="mt-3" loading={loading}>
        {accountant?.payments?.length > 0 ? (
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
              {accountant.payments.map((payment) => (
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

export default AccountantProfile;
