import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Row, Col, Button, Card, Checkbox, message } from "antd";
import { useSelector } from "react-redux";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { RootState } from "../../app/store";
import Loader from "../../components/Loader";
import { register, resetError } from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";

// Type for form values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  roles: CheckboxValueType[];
}

const AddUser: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const dispatch = useAppDispatch();

  const { error, loading } = useSelector((state: RootState) => state.getUsers);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (error) {
      messageApi.error(error);
      dispatch(resetError());
    }
  }, [error, dispatch, messageApi]);

  const submitHandler = (values: FormValues) => {
    if (values.password !== values.confirmPassword) {
      messageApi.error("Passwords do not match!");
      return;
    }

    const { firstName, lastName, email, phone, password, roles } = values;

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
      isAdmin: roles.includes("Admin"),
      isAccountant: roles.includes("Accountant"),
      isTeacher: roles.includes("Teacher"),
    };

    dispatch(register(userData));
  };

  return (
    <div className="mt-4">
      {contextHolder}
      <Link to="/users/" className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>
      <Card title="Register User" className="shadow">
        {loading && <Loader />}
        <Form<FormValues>
          form={form}
          layout="vertical"
          onFinish={submitHandler}
          initialValues={{ roles: [] }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Last Name is required" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ required: true, message: "Confirm your password" }]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="User Roles" name="roles">
            <Checkbox.Group>
              <Row gutter={[8, 8]}>
                <Col>
                  <Checkbox value="Admin">Admin</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="Accountant">Accountant</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="Teacher">Teacher</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddUser;
