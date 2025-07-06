import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  createClassLevel,
  resetCreateState,
} from "../../../features/academic/classLevelSlice";
import { useNavigate, Link } from "react-router-dom";
import type { RootState } from "../../../app/store"; // Adjust path as needed strong form typing
import { useAppDispatch } from "../../../app/hooks";
import Message from "../../../components/Message";

const AddClassLevel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadingCreate, successCreate, errorCreate } = useSelector(
    (state: RootState) => state.getClassLevels
  );

  useEffect(() => {
    if (successCreate) {
      message.success("ClassLevel created successfully!");
      navigate("/academic/classLevels");
    }
    dispatch(resetCreateState());
  }, [successCreate, navigate, dispatch]);

  const onFinish = (values: { name: string; id: number }) => {
    dispatch(createClassLevel(values));
  };

  return (
    <div>
      <Link to="/academic/classLevels">
        <Button className="mb-4" type="default" icon={<ArrowLeftOutlined />}>
          Back to ClassLevels
        </Button>
      </Link>

      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      <Card title="Add ClassLevel" className="mt-4">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Id"
            name="id"
            rules={[{ required: true, message: "Enter classLevel id" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Enter classLevel name" }]}
          >
            <Input />
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
