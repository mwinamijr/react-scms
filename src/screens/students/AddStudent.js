import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  createStudent,
  resetCreateState,
} from "../../features/students/studentSlice";

const { Title } = Typography;
const { Option } = Select;

function AddStudent() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingCreate, errorCreate, successCreate } = useSelector(
    (state) => state.getStudents
  );

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Student added successfully!");
      navigate("/sis/students");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday.toISOString(), // Convert date to ISO format
    };
    dispatch(createStudent(formattedValues));
  };

  return (
    <div className="container">
      <Link to="/sis/students/" className="mb-3">
        <Button type="link">Go Back</Button>
      </Link>

      <Card className="shadow" bordered>
        <Title level={3} className="text-center">
          Add New Student
        </Title>

        <Form
          layout="vertical"
          form={form}
          onFinish={submitHandler}
          className="mt-3"
        >
          {/* Personal Information */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Middle Name" name="middleName">
                <Input placeholder="Enter middle name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Last Name is required" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>

          {/* Academic Details */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Admission Number"
                name="admissionNumber"
                rules={[
                  { required: true, message: "Admission Number is required" },
                ]}
              >
                <Input type="number" placeholder="Enter admission number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Class Level"
                name="classLevel"
                rules={[{ required: true, message: "Class Level is required" }]}
              >
                <Select placeholder="Choose class level">
                  <Option value="form one">Form One</Option>
                  <Option value="form two">Form Two</Option>
                  <Option value="form three">Form Three</Option>
                  <Option value="form four">Form Four</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Additional Information */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[{ required: true, message: "Birthday is required" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
          </Row>

          {/* Contact Information */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Region" name="region">
                <Input placeholder="Enter region" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="City" name="city">
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Street" name="street">
                <Input placeholder="Enter street" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="STD VII Number" name="stdViiNumber">
                <Input placeholder="Enter STD VII Number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Prems Number" name="premsNumber">
                <Input placeholder="Enter Prems Number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Parent Phone"
            name="parentContact"
            rules={[
              {
                required: true,
                message: "Parent Contact is required",
              },
            ]}
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
            <div style={{ color: "red", marginTop: "16px" }}>{errorCreate}</div>
          )}
        </Form>
      </Card>
    </div>
  );
}

export default AddStudent;
