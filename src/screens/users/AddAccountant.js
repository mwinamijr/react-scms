import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Card,
  DatePicker,
  Select,
  message,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  createAccountant,
  resetCreateState,
} from "../../features/user/accountantSlice";
import dayjs from "dayjs";

const { Option } = Select;
const { Title } = Typography;

const AddAccountant = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingCreate, errorCreate, successCreate } = useSelector(
    (state) => state.getAccountants
  );

  useEffect(() => {
    if (successCreate) {
      dispatch(resetCreateState());
      message.success("Accountant added successfully!");
      navigate("/users/accountants");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    const {
      firstName,
      middleName,
      lastName,
      phone,
      gender,
      empId,
      tin_number,
      nssf_number,
      salary,
      nida,
      address,
      birthday,
      password,
    } = values;

    const email = `${firstName}.${lastName}@hayatul.com`.toLowerCase();
    const formattedDate = dayjs(birthday).format("YYYY-MM-DD"); // Format date

    const accountantData = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email,
      phone_number: phone,
      gender,
      empId,
      tin_number,
      nssf_number,
      salary,
      nida,
      address,
      date_of_birth: formattedDate, // Use formatted date
      password,
    };

    dispatch(createAccountant(accountantData));
  };

  return (
    <div className="mt-4">
      <Link to="/users/" className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      <Card title="Register Accountant" className="shadow">
        <Form form={form} layout="vertical" onFinish={submitHandler}>
          {/* Personal Information Section */}
          <Title level={5}>Personal Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "First Name is required" }]}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Middle Name" name="middleName">
                <Input placeholder="Enter middle name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
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
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Phone number is required" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          {/* Additional Information Section */}
          <Title level={5} className="mt-4">
            Additional Information
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Date of Birth"
                name="birthday"
                rules={[
                  { required: true, message: "Date of birth is required" },
                ]}
              >
                <DatePicker className="w-full" format="DD-MM-YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
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

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Employee ID" name="empId">
                <Input placeholder="Enter employee ID" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="NIDA Number" name="nida">
                <Input placeholder="Enter NIDA number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="TIN Number" name="tin_number">
                <Input placeholder="Enter TIN number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="NSSF Number" name="nssf_number">
                <Input placeholder="Enter NSSF number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Salary" name="salary">
                <Input type="number" placeholder="Enter salary amount" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Address" name="address">
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              disabled={loadingCreate}
            >
              {loadingCreate ? "Registering..." : "Register Accountant"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddAccountant;
