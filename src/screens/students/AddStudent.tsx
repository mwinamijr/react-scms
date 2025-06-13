import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  Typography,
  Row,
  Col,
  message,
  Divider,
  Breadcrumb,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { Moment } from "moment";

import {
  createStudent,
  resetCreateState,
} from "../../features/students/studentSlice";
import { listClassLevels } from "../../features/academic/classLevelSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

const { Title, Text } = Typography;
const { Option } = Select;

interface FormValues {
  first_name: string;
  middle_name?: string;
  last_name: string;
  admission_number: string;
  class_level: string;
  birthday?: Moment;
  gender: string;
  religion: string;
  region?: string;
  city?: string;
  street?: string;
  std_vii_number?: string;
  prems_number?: string;
  parent_contact: string;
}

const AddStudent: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadingCreate, errorCreate, successCreate } = useSelector(
    (state: RootState) => state.getStudents
  );

  const { classLevels, loading } = useSelector(
    (state: RootState) => state.getClassLevels
  );

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Student added successfully!");
      navigate("/sis/students");
    }
  }, [dispatch, successCreate, navigate]);

  useEffect(() => {
    dispatch(listClassLevels());
  }, [dispatch]);

  const submitHandler = (values: FormValues) => {
    const formattedValues = {
      first_name: values.first_name,
      middle_name: values.middle_name || "",
      last_name: values.last_name,
      admission_number: Number(values.admission_number),
      class_level: values.class_level,
      date_of_birth: values.birthday
        ? values.birthday.format("YYYY-MM-DD")
        : null,
      gender: values.gender,
      religion: values.religion,
      region: values.region || "",
      city: values.city || "",
      street: values.street || "",
      std_vii_number: values.std_vii_number || "",
      prems_number: values.prems_number || "",
      parent_contact: values.parent_contact,
    };

    dispatch(createStudent(formattedValues));
  };

  return (
    <div className="container">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/sis/students/">Students</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Student</Breadcrumb.Item>
      </Breadcrumb>

      <Card bordered className="shadow-lg mt-3">
        <Title level={3} className="text-center">
          Add New Student
        </Title>
        <Divider />

        <Form
          layout="vertical"
          form={form}
          onFinish={submitHandler}
          className="mt-3"
        >
          <Title level={5}>Personal Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Middle Name" name="middle_name">
                <Input placeholder="Enter middle name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Last Name is required" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>

          <Title level={5} className="mt-4">
            Academic Details
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Admission Number"
                name="admission_number"
                rules={[
                  { required: true, message: "Admission Number is required" },
                ]}
              >
                <Input type="text" placeholder="Enter admission number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Class Level"
                name="class_level"
                rules={[{ required: true, message: "Class Level is required" }]}
              >
                <Select placeholder="Choose class level" loading={loading}>
                  {classLevels.map((level) => (
                    <Option key={level.id} value={level.name}>
                      {level.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Title level={5} className="mt-4">
            Additional Information
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[{ required: true, message: "Birthday is required" }]}
              >
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Select placeholder="Choose gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Religion"
                name="religion"
                rules={[{ required: true, message: "Religion is required" }]}
              >
                <Select placeholder="Choose religion">
                  <Option value="Islam">Islam</Option>
                  <Option value="Christian">Christian</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Title level={5} className="mt-4">
            Contact Information
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item label="Region" name="region">
                <Input placeholder="Enter region" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="City" name="city">
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Street" name="street">
                <Input placeholder="Enter street" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="STD VII Number" name="std_vii_number">
                <Input placeholder="Enter STD VII Number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Prems Number" name="prems_number">
                <Input placeholder="Enter Prems Number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Parent Phone"
            name="parent_contact"
            rules={[{ required: true, message: "Parent Contact is required" }]}
          >
            <Input placeholder="Enter parent phone number" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingCreate}
              block
            >
              Add Student
            </Button>
          </Form.Item>

          {errorCreate && (
            <Text type="danger" className="mt-3">
              {errorCreate}
            </Text>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default AddStudent;
