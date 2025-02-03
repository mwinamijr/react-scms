import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import Message from "../../components/Message";
import {
  getTeacherDetails,
  updateTeacher,
} from "../../features/user/teacherSlice";

const EditTeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, teacher } = useSelector((state) => state.getTeachers);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getTeacherDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (teacher) {
      form.setFieldsValue({
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        email: teacher.email,
        phone_number: teacher.phone_number,
        address: teacher.address,
        designation: teacher.designation,
        salary: teacher.salary,
      });
    }
  }, [teacher, form]);

  const onFinish = (values) => {
    dispatch(updateTeacher({ id, ...values }))
      .unwrap()
      .then(() => {
        message.success("Profile updated successfully!");
        navigate(`/users/teachers/${id}`);
      })
      .catch(() => message.error("Failed to update profile"));
  };

  return (
    <div className="edit-profile-container">
      <Link to="/users/teachers/" className="btn btn-light my-3">
        Go Back
      </Link>
      <h2>Edit Teacher Profile</h2>
      {error && <Message variant="danger">{error}</Message>}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="phone_number" label="Phone Number">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item name="designation" label="Designation">
          <Input />
        </Form.Item>
        <Form.Item name="salary" label="Salary">
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditTeacherProfile;
