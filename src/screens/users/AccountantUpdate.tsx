import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Card,
  DatePicker,
  Select,
  message,
  Typography,
  Col,
  Row,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  getAccountantDetails,
  updateAccountant,
} from "../../features/user/accountantSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

const { Option } = Select;
const { Title } = Typography;

type Params = {
  id: string;
};

type FormValues = {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email?: string;
  alt_email?: string;
  phone_number?: string;
  gender?: string;
  empId?: string;
  tin_number?: string;
  nssf_number?: string;
  salary?: number;
  nida?: string;
  address?: string;
  date_of_birth?: Dayjs | null;
};

const EditAccountantProfile: React.FC = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<FormValues>();

  const { loading, error, accountant } = useSelector(
    (state: RootState) => state.getAccountants
  );

  useEffect(() => {
    if (id) dispatch(getAccountantDetails(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (accountant) {
      form.setFieldsValue({
        first_name: accountant.first_name,
        middle_name: accountant.middle_name,
        last_name: accountant.last_name,
        email: accountant.email,
        alt_email: accountant.alt_email,
        phone_number: accountant.phone_number,
        gender: accountant.gender,
        empId: accountant.empId,
        tin_number: accountant.tin_number,
        nssf_number: accountant.nssf_number,
        salary: accountant.salary,
        nida: accountant.national_id,
        address: accountant.address,
        date_of_birth: accountant.date_of_birth
          ? dayjs(accountant.date_of_birth)
          : null,
      });
    }
  }, [accountant, form]);

  const onFinish = (values: FormValues) => {
    const formattedValues = {
      ...values,
      date_of_birth: values.date_of_birth
        ? dayjs(values.date_of_birth).format("YYYY-MM-DD")
        : null,
    };

    if (id) {
      dispatch(updateAccountant({ id: Number(id), ...formattedValues }))
        .unwrap()
        .then(() => {
          message.success("Profile updated successfully!");
          navigate(`/users/accountants/${id}`);
        })
        .catch(() => message.error("Failed to update profile"));
    }
  };

  return (
    <div className="edit-profile-container mt-4">
      <Link
        to={`/users/accountants/${id}`}
        className="ant-btn ant-btn-link mb-4"
      >
        Go Back
      </Link>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Card title="Edit Accountant Profile" className="shadow">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Personal Information */}
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

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Phone Number" name="phone_number">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={18}>
              <Form.Item label="Alternative Email" name="alt_email">
                <Input type="email" />
              </Form.Item>
            </Col>
          </Row>

          {/* Additional Information */}
          <Title level={5} className="mt-4">
            Additional Information
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item label="Date of Birth" name="date_of_birth">
                <DatePicker className="w-full" format="DD-MM-YYYY" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Gender" name="gender">
                <Select placeholder="Choose gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Employee ID" name="empId">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="NIDA Number" name="nida">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="TIN Number" name="tin_number">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="NSSF Number" name="nssf_number">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Salary" name="salary">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditAccountantProfile;
