import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import Message from "../../components/Message";
import {
  getAccountantDetails,
  updateAccountant,
} from "../../features/user/accountantSlice";

const EditAccountantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, accountant } = useSelector(
    (state) => state.getAccountants
  );
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAccountantDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (accountant) {
      form.setFieldsValue({
        first_name: accountant.first_name,
        last_name: accountant.last_name,
        email: accountant.email,
        phone_number: accountant.phone_number,
        address: accountant.address,
        salary: accountant.salary,
      });
    }
  }, [accountant, form]);

  const onFinish = (values) => {
    dispatch(updateAccountant({ id, ...values }))
      .unwrap()
      .then(() => {
        message.success("Profile updated successfully!");
        navigate(`/users/accountants/${id}`);
      })
      .catch(() => message.error("Failed to update profile"));
  };

  return (
    <div className="edit-profile-container">
      <Link to="/users/accountants/" className="btn btn-light my-3">
        Go Back
      </Link>
      <h2>Edit Accountant Profile</h2>
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

export default EditAccountantProfile;
