import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Descriptions, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentDetails } from "../../../features/academic/departmentSlice";
import Message from "../../../components/Message";
import { ArrowLeftOutlined } from "@ant-design/icons";

const DepartmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { department, loading, error } = useSelector(
    (state) => state.getDepartments
  );

  useEffect(() => {
    dispatch(getDepartmentDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/academic/departments">
        <Button type="default" icon={<ArrowLeftOutlined />}>
          Back to Departments
        </Button>
      </Link>

      {error && <Message variant="danger">{error}</Message>}

      {department && (
        <Card title={department.name} className="mt-4" loading={loading}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {department?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Order">
              {department?.order_rank}
            </Descriptions.Item>
          </Descriptions>
          <div className="mt-4">
            <Link to={`/academic/departments/${id}/edit`} className="ml-2">
              <Button type="primary">Edit</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DepartmentDetails;
