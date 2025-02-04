import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepartmentDetails,
  updateDepartment,
} from "../../../features/academic/departmentSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateDepartment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { department, loading } = useSelector((state) => state.getDepartments);

  useEffect(() => {
    dispatch(getDepartmentDetails(id));
  }, [dispatch, id]);

  const onFinish = (values) => {
    dispatch(updateDepartment({ id, ...values })).then(() => {
      message.success("Department updated successfully!");
      navigate("/academic/departments");
    });
  };

  return (
    <div>
      <Link to={`/academic/departments/${id}`}>
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to {department.name}
        </Button>
      </Link>
      <Card title="Update Department" className="mt-4" loading={loading}>
        <Form layout="vertical" onFinish={onFinish} initialValues={department}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Order"
            name="order_rank"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update Department
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateDepartment;
