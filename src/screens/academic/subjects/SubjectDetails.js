import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Descriptions, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectDetails } from "../../../features/academic/subjectSlice";
import Message from "../../../components/Message";
import { ArrowLeftOutlined } from "@ant-design/icons";

const SubjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { subject, loading, error } = useSelector((state) => state.getSubjects);

  useEffect(() => {
    dispatch(getSubjectDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/academic/subjects">
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to Subjects
        </Button>
      </Link>

      {error && <Message variant="danger">{error}</Message>}

      {subject && (
        <Card title={subject.name} className="mt-4" loading={loading}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{subject?.name}</Descriptions.Item>
            <Descriptions.Item label="Code">
              {subject?.subject_code}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {subject?.department}
            </Descriptions.Item>
            <Descriptions.Item label="Graded">
              {subject?.graded ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Selectable">
              {subject?.is_selectable ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {subject?.description}
            </Descriptions.Item>
          </Descriptions>
          <div className="mt-4">
            <Link to={`/academic/subjects/${id}/edit`} className="ml-2">
              <Button type="primary">Edit</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SubjectDetails;
