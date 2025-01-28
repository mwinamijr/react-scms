import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  Table,
  Row,
  Col,
  Input,
  Button,
  Pagination,
  Form,
  message,
  Space,
  Spin,
} from "antd";
import {
  EditOutlined,
  UserAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { listStudents } from "../../features/students/studentSlice";

const Students = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    class_level: "",
  });

  const { loading, error, students, pagination } = useSelector(
    (state) => state.getStudents
  );

  useEffect(() => {
    dispatch(listStudents({ ...filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    dispatch(listStudents({ ...filters, page: 1 }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    dispatch(listStudents({ ...filters, page }));
  };

  const totalPages = pagination ? Math.ceil(pagination.count / 30) : 1;

  return (
    <div className="students-page">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="text-center mb-4">Students</h1>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} sm={12} lg={6}>
          <Button type="primary" icon={<UserAddOutlined />} block>
            <Link to="/sis/students/add">Add Student</Link>
          </Button>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Button type="default" icon={<UploadOutlined />} block>
            <Link to="/sis/students/upload">Bulk Upload</Link>
          </Button>
        </Col>
      </Row>

      <Form layout="vertical" onFinish={handleSearch}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="First Name">
              <Input
                name="first_name"
                placeholder="Enter first name"
                value={filters.first_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Middle Name">
              <Input
                name="middle_name"
                placeholder="Enter middle name"
                value={filters.middle_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Last Name">
              <Input
                name="last_name"
                placeholder="Enter last name"
                value={filters.last_name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Class Level">
              <Input
                name="class_level"
                placeholder="Enter class level"
                value={filters.class_level}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Button type="primary" htmlType="submit" block>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <Space size="middle">
          <Spin tip="Loading student details..." />
        </Space>
      ) : error ? (
        message.error(error)
      ) : (
        <div>
          <Table
            dataSource={students}
            rowKey={(record) => record.id}
            pagination={false}
            className="mt-4"
            responsive="true"
          >
            <Table.Column
              title="Adm No"
              dataIndex="admission_number"
              key="admission_number"
            />
            <Table.Column
              title="Full Name"
              key="fullName"
              render={(record) =>
                `${record.first_name} ${record.middle_name} ${record.last_name}`
              }
            />
            <Table.Column title="Sex" dataIndex="gender" key="gender" />
            <Table.Column
              title="Class"
              dataIndex="class_level"
              key="class_level"
            />
            <Table.Column
              title="Birthday"
              dataIndex="date_of_birth"
              key="date_of_birth"
            />
            <Table.Column
              title="Actions"
              key="actions"
              render={(record) => (
                <Space size="middle">
                  <Link to={`/sis/students/${record.id}`}>
                    <EditOutlined />
                  </Link>
                </Space>
              )}
            />
          </Table>
          <Pagination
            className="mt-4"
            current={currentPage}
            total={totalPages * 30}
            pageSize={30}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Students;
