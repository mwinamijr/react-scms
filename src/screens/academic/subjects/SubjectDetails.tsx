import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Descriptions, Card, Button } from "antd";
import { useSelector } from "react-redux";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { getSubjectDetails } from "../../../features/academic/subjectSlice";
import Message from "../../../components/Message";
import type { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

// Subject Type (adjust according to your API model)
interface Subject {
  id: number;
  name: string;
  subject_code: string;
  department: string;
  graded: boolean;
  is_selectable: boolean;
  description: string;
}

const SubjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { subject, loading, error } = useSelector(
    (state: RootState) =>
      state.getSubjects as {
        subject: Subject | null;
        loading: boolean;
        error: string | null;
      }
  );

  useEffect(() => {
    if (id) {
      dispatch(getSubjectDetails(Number(id)));
    }
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
            <Descriptions.Item label="Name">{subject.name}</Descriptions.Item>
            <Descriptions.Item label="Code">
              {subject.subject_code}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {subject.department}
            </Descriptions.Item>
            <Descriptions.Item label="Graded">
              {subject.graded ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Selectable">
              {subject.is_selectable ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {subject.description}
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
