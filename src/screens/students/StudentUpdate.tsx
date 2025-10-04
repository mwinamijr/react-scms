import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  Breadcrumb,
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
  studentDetails,
  updateStudent,
} from "../../features/students/studentSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

const { Option } = Select;
const { Title } = Typography;

interface StudentFormValues {
  first_name: string;
  middle_name?: string;
  last_name: string;
  gender?: string;
  religion?: string;
  region?: string;
  city?: string;
  street?: string;
  blood_group?: string;
  parent_guardian?: string;
  parent_contact?: string;
  admission_number?: number;
  prems_number?: string;
  class_level?: string;
  class_of_year?: string;
  date_of_birth?: Dayjs | null;
  admission_date?: Dayjs | null;
  graduation_date?: Dayjs | null;
  date_dismissed?: Dayjs | null;
}

const EditStudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<StudentFormValues>();

  const { loading, error, student } = useSelector(
    (state: RootState) => state.getStudents
  );

  useEffect(() => {
    if (id) {
      dispatch(studentDetails(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (student) {
      form.setFieldsValue({
        first_name: student.first_name,
        middle_name: student.middle_name,
        last_name: student.last_name,
        gender: student.gender,
        religion: student.religion,
        region: student.region,
        city: student.city,
        street: student.street,
        parent_guardian: student.parent_guardian_display,
        parent_contact: student.parent_contact,
        admission_number: student.admission_number,
        prems_number: student.prems_number,
        class_level: student.class_level_display,
        class_of_year: student.class_of_year_display,
        date_of_birth: student.date_of_birth
          ? dayjs(student.date_of_birth)
          : null,
        admission_date: student.admission_date
          ? dayjs(student.admission_date)
          : null,
        graduation_date: student.graduation_date
          ? dayjs(student.graduation_date)
          : null,
        date_dismissed: student.date_dismissed
          ? dayjs(student.date_dismissed)
          : null,
      });
    }
  }, [student, form]);

  const onFinish = (values: StudentFormValues) => {
    const formattedValues = {
      ...values,
      date_of_birth: values.date_of_birth?.format("YYYY-MM-DD") || null,
      admission_date: values.admission_date?.format("YYYY-MM-DD") || null,
      graduation_date: values.graduation_date?.format("YYYY-MM-DD") || null,
      date_dismissed: values.date_dismissed?.format("YYYY-MM-DD") || null,
    };

    dispatch(updateStudent({ id: Number(id), ...formattedValues }))
      .unwrap()
      .then(() => {
        message.success("Student profile updated successfully!");
        navigate(`/sis/students/${id}`);
      })
      .catch(() => {
        message.error("Failed to update student profile");
      });
  };

  return (
    <div className="edit-profile-container mt-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/sis/students/">Students</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update Student</Breadcrumb.Item>
      </Breadcrumb>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <Card title="Edit Student Profile" className="shadow">
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
            <Col xs={24} md={8}>
              <Form.Item label="Gender" name="gender">
                <Select placeholder="Choose gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Date of Birth" name="date_of_birth">
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Religion" name="religion">
                <Select placeholder="Choose religion">
                  <Option value="Islam">Islam</Option>
                  <Option value="Christian">Christian</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Contact Information */}
          <Title level={5}>Contact Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item label="Region" name="region">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Street" name="street">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Parent/Guardian Email" name="parent_guardian">
                <Input disabled type="email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Parent Contact" name="parent_contact">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Academic Information */}
          <Title level={5}>Academic Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item label="Class Level" name="class_level">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Class of Year" name="class_of_year">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item label="Admission Number" name="admission_number">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Prem Number" name="prem_number">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Form.Item label="Admission Date" name="admission_date">
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Graduation Date" name="graduation_date">
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Date Dismissed" name="date_dismissed">
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>

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

export default EditStudentProfile;
