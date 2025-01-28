import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Tabs,
  Descriptions,
  Divider,
  Table,
  Typography,
  Button,
  Space,
  Spin,
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
    dispatch(studentDetails(id));
  }, [dispatch, id]);

  return (
    <div className="student-details-screen">
      <Button type="link" icon={<LeftOutlined />}>
        <Link to="/sis/students/">Go Back</Link>
      </Button>
      {loading ? (
        <Space size="middle">
          <Spin tip="Loading student details..." />
        </Space>
      ) : error ? (
        <Text type="danger">{error}</Text>
      ) : student ? (
        <div>
          <Title level={3}>Student Profile</Title>
          <Row gutter={[16, 16]}>
            {/* Student Summary Card */}
            <Col xs={24} md={8}>
              <Card
                title={
                  <div>
                    <Title level={4}>
                      {student.first_name} {student.last_name}
                    </Title>
                    <Text type="secondary">
                      PREMS#: {student.prems_number || "N/A"}
                    </Text>
                  </div>
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
                        {student.admission_date
                          ? new Date(
                              student.admission_date
                            ).toLocaleDateString()
                          : "N/A"}
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

                  {/* Siblings Tab */}
                  <TabPane tab="Siblings" key="2">
                    {student.sibling && student.sibling.length > 0 ? (
                      <Table
                        dataSource={student.sibling}
                        rowKey={(record) => record.id}
                        pagination={false}
                        className="mt-3"
                      >
                        <Table.Column
                          title="Full Name"
                          key="fullName"
                          render={(record) =>
                            `${record.first_name} ${record.middle_name} ${record.last_name}`
                          }
                        />
                      </Table>
                    ) : (
                      <Text>No siblings available.</Text>
                    )}
                  </TabPane>

                  {/* Payments Tab */}
                  <TabPane tab="Payments" key="3">
                    <Text>Payments information coming soon.</Text>
                  </TabPane>

                  {/* Attendance Tab */}
                  <TabPane tab="Attendance" key="4">
                    <Text>Attendance records coming soon.</Text>
                  </TabPane>

                  {/* Examination Tab */}
                  <TabPane tab="Examinations" key="5">
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
