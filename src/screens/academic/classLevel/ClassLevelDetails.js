import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Descriptions, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getClassLevelDetails } from "../../../features/academic/classLevelSlice";
import Message from "../../../components/Message";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ClassLevelDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { classLevel, loading, error } = useSelector(
    (state) => state.getClassLevels
  );

  useEffect(() => {
    dispatch(getClassLevelDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/academic/classLevels">
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to ClassLevels
        </Button>
      </Link>

      {error && <Message variant="danger">{error}</Message>}

      {classLevel && (
        <Card title={classLevel.name} className="mt-4" loading={loading}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {classLevel?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Grade Level">
              {classLevel?.grade_level}
            </Descriptions.Item>
          </Descriptions>
          <div className="mt-4">
            <Link to={`/academic/classLevels/${id}/edit`} className="ml-2">
              <Button type="primary">Edit</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ClassLevelDetails;
