import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassLevelDetails,
  updateClassLevel,
} from "../../../features/academic/classLevelSlice";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { RootState } from "../../../app/store";
import type { AppDispatch } from "../../../app/store";

interface ClassLevel {
  id: number;
  name: string;
  grade_level: number;
}

const UpdateClassLevel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Use selector with RootState type
  const { classLevel, loading } = useSelector(
    (state: RootState) => state.getClassLevels
  );

  useEffect(() => {
    if (id) {
      dispatch(getClassLevelDetails(Number(id)));
    }
  }, [dispatch, id]);

  const onFinish = (values: Partial<ClassLevel>) => {
    if (!id) return;
    dispatch(updateClassLevel({ id: Number(id), ...values })).then(() => {
      message.success("ClassLevel updated successfully!");
      navigate("/academic/classLevels");
    });
  };

  return (
    <div>
      <Link to={`/academic/classLevels/${id}`}>
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to {classLevel?.name || "ClassLevel"}
        </Button>
      </Link>
      <Card title="Update ClassLevel" className="mt-4" loading={loading}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={classLevel}
          key={classLevel?.id} // To reinitialize form when classLevel changes
        >
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
