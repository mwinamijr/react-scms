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
import dayjs from "dayjs";
import type { RootState } from "../../app/store";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  getTeacherDetails,
  updateTeacher,
} from "../../features/user/teacherSlice";
import { listSubjects } from "../../features/academic/subjectSlice";
import { useAppDispatch } from "../../app/hooks";

const { Option } = Select;
const { Title } = Typography;

interface TeacherFormValues {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  short_name?: string;
  alt_email?: string;
  gender?: string;
  empId?: string;
  tin_number?: string;
  nssf_number?: string;
  salary?: number;
  national_id?: string;
  address?: string;
  date_of_birth?: dayjs.Dayjs;
  subject_specialization?: string[];
}

const EditTeacherProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<TeacherFormValues>();

  const { loading, loadingCreate, error, teacher } = useSelector(
    (state: RootState) => state.getTeachers
  );

  const {
    subjects,
    loading: subjectsLoading,
    error: subjectsError,
  } = useSelector((state: RootState) => state.getSubjects);

  useEffect(() => {
    if (id) {
      dispatch(getTeacherDetails(Number(id)));
    }
    dispatch(listSubjects());
  }, [dispatch, id]);

  useEffect(() => {
    if (teacher && subjects.length) {
      form.setFieldsValue({
        first_name: teacher.first_name,
        middle_name: teacher.middle_name,
        last_name: teacher.last_name,
        email: teacher.email,
        short_name: teacher.short_name,
        phone_number: teacher.phone_number,
        gender: teacher.gender,
        empId: teacher.empId,
        tin_number: teacher.tin_number,
        nssf_number: teacher.nssf_number,
        salary: teacher.salary,
        national_id: teacher.national_id,
        address: teacher.address,
        date_of_birth: teacher.date_of_birth
          ? dayjs(teacher.date_of_birth)
          : undefined,
        subject_specialization: teacher.subject_specialization_display || [],
      });
    }
  }, [teacher, subjects, form]);

  const onFinish = (values: TeacherFormValues) => {
    const formattedValues = {
      ...values,
      date_of_birth: values.date_of_birth
        ? dayjs(values.date_of_birth).format("YYYY-MM-DD")
        : null,
    };

    if (!id) return;

    dispatch(updateTeacher({ id: Number(id), ...formattedValues }))
      .unwrap()
      .then(() => {
        message.success("Profile updated successfully!");
        navigate(`/users/teachers/${id}`);
      })
      .catch(() => message.error("Failed to update profile"));
  };

  return (
    <div className="edit-profile-container mt-4">
      <Link to={`/users/teachers/${id}`} className="ant-btn ant-btn-link mb-4">
        Go Back
      </Link>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {subjectsError && <Message variant="danger">{subjectsError}</Message>}

      <Card title="Edit Teacher Profile" className="shadow">
        <Form<TeacherFormValues>
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
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
            <Col xs={24} md={6}>
              <Form.Item label="Short Name" name="short_name">
                <Input />
              </Form.Item>
            </Col>
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
              <Form.Item label="NIDA Number" name="national_id">
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

          {/* Subject Specialization */}
          <Title level={5} className="mt-4">
            Subject Specialization
          </Title>
          <Form.Item label="Subjects Taught" name="subject_specialization">
            <Select
              mode="multiple"
              placeholder="Select subjects"
              loading={subjectsLoading}
            >
              {subjects.map((subject) => (
                <Option key={subject.id} value={subject.name}>
                  {subject.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loadingCreate}
            >
              {loadingCreate ? "Saving Changes..." : "Save Changes"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditTeacherProfile;
