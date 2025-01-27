import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Tabs,
  Descriptions,
  Divider,
  Typography,
  Button,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { studentDetails } from "../../features/students/studentSlice";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const StudentDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, student } = useSelector((state) => state.getStudents);

  useEffect(() => {
    dispatch(studentDetails(id)); // Fetch the student details
  }, [dispatch, id]);

  return (
    <div>
      <Button type="link" icon={<LeftOutlined />}>
        <Link to="/sis/students/">Go Back</Link>
      </Button>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text type="danger">{error}</Text>
      ) : student ? (
        <div>
          <Title level={3}>Student Profile</Title>
          <Row gutter={16}>
            {/* Student Summary Card */}
            <Col xs={24} md={8}>
              <Card
                title={
                  <>
                    <Title level={4}>
                      {student.first_name} {student.last_name}
                    </Title>
                    <Text type="secondary">
                      PREMS#: {student.prems_number || "N/A"}
                    </Text>
                  </>
                }
                bordered
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Admission Number">
                    {student.admission_number || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {student.gender || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Date of Birth">
                    {student.date_of_birth || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Parent Contact">
                    {student.parent_contact || "N/A"}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            {/* Detailed Information Tabs */}
            <Col xs={24} md={16}>
              <Card>
                <Tabs defaultActiveKey="1">
                  {/* Basic Info Tab */}
                  <TabPane tab="Basic Info" key="1">
                    <Descriptions title="Basic Information" bordered column={2}>
                      <Descriptions.Item label="Status">
                        Active
                      </Descriptions.Item>
                      <Descriptions.Item label="Form">
                        {student.class_level || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Region">
                        {student.region || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="City">
                        {student.city || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Stream">A</Descriptions.Item>
                      <Descriptions.Item label="Admission Date">
                        {new Date(
                          student.admission_date
                        ).toLocaleDateString() || "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Descriptions title="Address" bordered column={2}>
                      <Descriptions.Item label="Street">
                        {student.street || "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Parent/Guardian">
                        {student.parent_guardian || "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                  </TabPane>

                  {/* Payments Tab */}
                  <TabPane tab="Payments" key="2">
                    <Text>Payments information coming soon.</Text>
                  </TabPane>

                  {/* Attendance Tab */}
                  <TabPane tab="Attendance" key="3">
                    <Text>Attendance records coming soon.</Text>
                  </TabPane>

                  {/* Examination Tab */}
                  <TabPane tab="Examinations" key="4">
                    <Text>Examination records coming soon.</Text>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Text>No student details found.</Text>
      )}
    </div>
  );
};

export default StudentDetailsScreen;
