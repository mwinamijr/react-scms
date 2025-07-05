import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Row,
  Col,
  Typography,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import dayjs from "dayjs";
import Message from "../../components/Message";
import {
  createTerm,
  createAcademicYear,
  deleteTerm,
  deleteAcademicYear,
  fetchAcademicYears,
  fetchTerms,
  updateTerm,
  updateAcademicYear,
} from "../../features/administration/termAndAcademicYearSlice";
import {
  createStudent,
  resetCreateState,
} from "../../features/students/studentSlice";
import { listClassLevels } from "../../features/academic/classLevelSlice";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;

const Admission: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    terms,
    academicYears,
    loading,
    error,
    successCreate,
    successUpdate,
    loadingCreate,
    loadingUpdate,
  } = useAppSelector((state) => state.getTermsAndAcademicYears);
  console.log(error);
  const { classLevels, loading: classLevelLoading } = useAppSelector(
    (state) => state.getClassLevels
  );
  const {
    loadingCreate: studentLoadingCreate,
    errorCreate,
    successCreate: studentSuccessCreate,
  } = useAppSelector((state) => state.getStudents);
  console.log("Academic Years:", academicYears);

  const [form] = Form.useForm();
  const [editingTerm, setEditingTerm] = useState<any>(null);
  const [editingYear, setEditingYear] = useState<any>(null);
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [studentForm] = Form.useForm();

  useEffect(() => {
    dispatch(fetchTerms());
    dispatch(fetchAcademicYears());
    dispatch(listClassLevels());
  }, [dispatch]);

  useEffect(() => {
    if (studentSuccessCreate) {
      dispatch(resetCreateState());
      message.success("Student added successfully!");
      setStudentModalOpen(false);
      studentForm.resetFields();
    }
  }, [successCreate, dispatch]);

  useEffect(() => {
    if (successCreate || successUpdate) {
      message.success("Saved successfully!");
      setIsYearModalOpen(false);
      setIsTermModalOpen(false);
      form.resetFields();
      dispatch(fetchAcademicYears());
      dispatch(fetchTerms());
    }
  }, [successCreate, successUpdate, dispatch]);

  const submitStudent = (values: any) => {
    const payload = {
      ...values,
      date_of_birth: values.birthday?.format("YYYY-MM-DD") || null,
      admission_number: Number(values.admission_number),
    };
    dispatch(createStudent(payload));
  };

  const safeDateRange = (
    start: string | null | undefined,
    end?: string | null | undefined
  ) => {
    console.log("🔍 safeDateRange called with:", { start, end });

    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (!startDate.isValid()) {
      const fallback = dayjs();
      return [fallback, endDate.isValid() ? endDate : fallback];
    }

    if (!endDate.isValid()) {
      return [startDate, startDate];
    }

    return [startDate, endDate];
  };

  // === TERM ===
  const openTermModal = (record?: any) => {
    setEditingTerm(record || null);
    setIsTermModalOpen(true);
    form.setFieldsValue(
      record
        ? {
            ...record,
            date_range: safeDateRange(record.start_date, record.end_date),
          }
        : {}
    );
  };

  const handleTermSubmit = async () => {
    const values = await form.validateFields();
    const [start, end] = values.date_range;
    const payload = {
      ...values,
      start_date: start.format("YYYY-MM-DD"),
      end_date: end ? end.format("YYYY-MM-DD") : null,
    };
    delete payload.date_range;

    if (editingTerm) {
      await dispatch(updateTerm({ id: editingTerm.id, data: payload }));
    } else {
      await dispatch(createTerm(payload));
    }
    setEditingTerm(null);
  };

  const handleDeleteTerm = async (id: number) => {
    await dispatch(deleteTerm(id));
    dispatch(fetchTerms());
  };

  // === ACADEMIC YEAR ===
  const openYearModal = (record?: any) => {
    setEditingYear(record || null);
    setIsYearModalOpen(true);
    form.setFieldsValue(
      record
        ? {
            ...record,
            date_range: safeDateRange(record.start_date, record.end_date),
          }
        : {}
    );
  };

  const handleYearSubmit = async () => {
    const values = await form.validateFields();
    const [start, end] = values.date_range;
    const payload = {
      ...values,
      start_date: start.format("YYYY-MM-DD"),
      end_date: end ? end.format("YYYY-MM-DD") : null,
    };
    delete payload.date_range;

    if (editingYear) {
      await dispatch(updateAcademicYear({ id: editingYear.id, data: payload }));
    } else {
      await dispatch(createAcademicYear(payload));
    }
    setEditingYear(null);
  };

  const handleDeleteYear = async (id: number) => {
    await dispatch(deleteAcademicYear(id));
    dispatch(fetchAcademicYears());
  };

  return (
    <div className="p-4">
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => openYearModal()}
        >
          Add Academic Year
        </Button>
        <Button icon={<PlusOutlined />} onClick={() => openTermModal()}>
          Add Term
        </Button>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setStudentModalOpen(true)}
        >
          Add Student
        </Button>
      </Space>

      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <h3>Academic Years</h3>
          <Table
            dataSource={academicYears}
            loading={loading}
            rowKey="id"
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Start Date", dataIndex: "start_date" },
              { title: "End Date", dataIndex: "end_date" },
              {
                title: "Active",
                dataIndex: "active_year",
                render: (val) => (val ? "Yes" : "No"),
              },
              {
                title: "Actions",
                render: (_, record) => (
                  <Space>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => openYearModal(record)}
                    />
                    <Popconfirm
                      title="Are you sure you want to delete this academic year?"
                      onConfirm={() => handleDeleteYear(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <h3>Terms</h3>
          <Table
            dataSource={terms}
            loading={loading}
            rowKey="id"
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Academic Year", dataIndex: "academic_year_name" },
              { title: "Start Date", dataIndex: "start_date" },
              { title: "End Date", dataIndex: "end_date" },
              {
                title: "Actions",
                render: (_, record) => (
                  <Space>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => openTermModal(record)}
                    />
                    <Popconfirm
                      title="Are you sure you want to delete this academic year?"
                      onConfirm={() => handleDeleteTerm(record.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        </Col>
      </Row>

      {/* Academic Year Modal */}
      <Modal
        title={editingYear ? "Edit Academic Year" : "Add Academic Year"}
        open={isYearModalOpen}
        footer={null}
        onCancel={() => setIsYearModalOpen(false)}
      >
        {error && <Message variant="danger">{error}</Message>}
        <Form form={form} layout="vertical" onFinish={handleYearSubmit}>
          <Form.Item name="name" label="Year Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="date_range"
            label="Start/End Dates"
            rules={[{ required: true }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            name="active_year"
            label="Active Year"
            initialValue={false}
          >
            <Select
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingCreate || loadingUpdate}
              disabled={loadingCreate || loadingUpdate}
              block
            >
              {editingYear ? "Update Year" : "Add Year"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Term Modal */}
      <Modal
        title={editingTerm ? "Edit Term" : "Add Term"}
        open={isTermModalOpen}
        footer={null}
        onCancel={() => setIsTermModalOpen(false)}
      >
        {error && <Message variant="danger">{error}</Message>}
        <Form form={form} layout="vertical" onFinish={handleTermSubmit}>
          <Form.Item name="name" label="Term Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="academic_year"
            label="Academic Year"
            rules={[{ required: true }]}
          >
            <Select
              options={academicYears.map((y) => ({
                label: y.name,
                value: y.id,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="date_range"
            label="Start/End Dates"
            rules={[{ required: true }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingCreate || loadingUpdate}
              disabled={loadingCreate || loadingUpdate}
              block
            >
              {editingTerm ? "Update Term" : "Add Term"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Student Modal */}
      <Modal
        title="Add Student"
        open={studentModalOpen}
        onCancel={() => setStudentModalOpen(false)}
        footer={null}
        width={800}
      >
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        <Form form={studentForm} layout="vertical" onFinish={submitStudent}>
          <Title level={5}>Personal Information</Title>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="middle_name" label="Middle Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="admission_number"
                label="Admission Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="class_level"
                label="Class Level"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select class level"
                  loading={classLevelLoading}
                >
                  {classLevels.map((level) => (
                    <Option key={level.id} value={level.name}>
                      {level.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="birthday"
                label="Birthday"
                rules={[{ required: true }]}
              >
                <DatePicker className="w-full" format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="religion"
                label="Religion"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="Islam">Islam</Option>
                  <Option value="Christian">Christian</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="region" label="Region">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="city" label="City">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="street" label="Street">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="std_vii_number" label="STD VII Number">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="prems_number" label="PREMS Number">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="parent_contact"
            label="Parent Contact"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={studentLoadingCreate}
              block
            >
              Add Student
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admission;
