import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createClassLevel } from "../../../features/academic/classLevelSlice";
import { useNavigate, Link } from "react-router-dom";

const AddClassLevel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingCreate } = useSelector((state) => state.getClassLevels);

  const onFinish = (values) => {
    dispatch(createClassLevel(values)).then(() => {
      message.success("ClassLevel created successfully!");
      navigate("/academic/classLevels");
    });
  };

  return (
    <div>
      <Link to="/academic/classLevels">
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to ClassLevels
        </Button>
      </Link>

      <Card title="Add ClassLevel" className="mt-4">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Enter classLevel name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Order"
            name="order_rank"
            rules={[{ required: true, message: "Enter classLevel rank" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loadingCreate}>
            Add ClassLevel
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddClassLevel;
