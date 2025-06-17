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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
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

const { RangePicker } = DatePicker;

const Admission: React.FC = () => {
  const dispatch = useAppDispatch();
  const { terms, academicYears, loading, error } = useAppSelector(
    (state) => state.getTermsAndAcademicYears
  );

  const [form] = Form.useForm();
  const [editingTerm, setEditingTerm] = useState<any>(null);
  const [editingYear, setEditingYear] = useState<any>(null);
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTerms());
    dispatch(fetchAcademicYears());
  }, [dispatch]);

  // === TERM ===
  const openTermModal = (record?: any) => {
    setEditingTerm(record || null);
    setIsTermModalOpen(true);
    form.setFieldsValue(
      record
        ? {
            ...record,
            date_range: [
              dayjs(record.start_date),
              record.end_date ? dayjs(record.end_date) : null,
            ],
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

    setIsTermModalOpen(false);
    dispatch(fetchTerms());
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
            date_range: [
              dayjs(record.start_date),
              record.end_date ? dayjs(record.end_date) : null,
            ],
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

    setIsYearModalOpen(false);
    dispatch(fetchAcademicYears());
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
      </Space>

      {error && <Message variant="danger">{error}</Message>}

      <Row gutter={24}>
        <Col span={12}>
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
                    <Button onClick={() => openYearModal(record)}>Edit</Button>
                    <Button danger onClick={() => handleDeleteYear(record.id)}>
                      Delete
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <h3>Terms</h3>
          <Table
            dataSource={terms}
            loading={loading}
            rowKey="id"
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Academic Year", dataIndex: "academic_year" },
              { title: "Start Date", dataIndex: "start_date" },
              { title: "End Date", dataIndex: "end_date" },
              {
                title: "Actions",
                render: (_, record) => (
                  <Space>
                    <Button onClick={() => openTermModal(record)}>Edit</Button>
                    <Button danger onClick={() => handleDeleteTerm(record.id)}>
                      Delete
                    </Button>
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
        onOk={handleYearSubmit}
        onCancel={() => setIsYearModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
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
            valuePropName="checked"
          >
            <Select
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Term Modal */}
      <Modal
        title={editingTerm ? "Edit Term" : "Add Term"}
        open={isTermModalOpen}
        onOk={handleTermSubmit}
        onCancel={() => setIsTermModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
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
        </Form>
      </Modal>
    </div>
  );
};

export default Admission;
