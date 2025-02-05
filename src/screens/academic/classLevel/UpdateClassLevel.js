import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassLevelDetails,
  updateClassLevel,
} from "../../../features/academic/classLevelSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateClassLevel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classLevel, loading } = useSelector((state) => state.getClassLevels);

  useEffect(() => {
    dispatch(getClassLevelDetails(id));
  }, [dispatch, id]);

  const onFinish = (values) => {
    dispatch(updateClassLevel({ id, ...values })).then(() => {
      message.success("ClassLevel updated successfully!");
      navigate("/academic/classLevels");
    });
  };

  return (
    <div>
      <Link to={`/academic/classLevels/${id}`}>
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to {classLevel.name}
        </Button>
      </Link>
      <Card title="Update ClassLevel" className="mt-4" loading={loading}>
        <Form layout="vertical" onFinish={onFinish} initialValues={classLevel}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Grade Level"
            name="grade_level"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update ClassLevel
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateClassLevel;
