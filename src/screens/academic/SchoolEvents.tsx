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
  Upload,
  message,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadExcel,
} from "../../features/administration/schoolEventSlice";
import axios from "axios";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const SchoolEvents: React.FC = () => {
  const dispatch = useAppDispatch();
  const { events, loading } = useAppSelector((state) => state.getSchoolEvents);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const openModal = (record?: any) => {
    setEditing(record || null);
    setIsModalOpen(true);
    if (record) {
      form.setFieldsValue({
        ...record,
        date_range: [
          dayjs(record.start_date),
          record.end_date ? dayjs(record.end_date) : null,
        ],
      });
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    const [start, end] = values.date_range;
    const payload = {
      ...values,
      start_date: start.format("YYYY-MM-DD"),
      end_date: end ? end.format("YYYY-MM-DD") : null,
    };
    delete payload.date_range;

    if (editing) {
      await dispatch(updateEvent({ id: editing.id, data: payload }));
    } else {
      await dispatch(createEvent(payload));
    }
    setIsModalOpen(false);
    dispatch(fetchEvents());
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteEvent(id));
    dispatch(fetchEvents());
  };

  const handleUpload = async (file: File) => {
    await dispatch(uploadExcel(file));
    message.success("Upload successful");
    dispatch(fetchEvents());
    return false; // prevent antd from uploading automatically
  };

  const downloadTemplate = async () => {
    const response = await axios.get("/api/school-events/template-download/", {
      responseType: "blob",
    });
    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "school_events_template.xlsx";
    link.click();
  };

  return (
    <div className="p-4">
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => openModal()}
        >
          Add Event
        </Button>
        <Upload beforeUpload={handleUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload Excel</Button>
        </Upload>
        <Button icon={<DownloadOutlined />} onClick={downloadTemplate}>
          Download Template
        </Button>
      </Space>

      <Table
        dataSource={events}
        loading={loading}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Type", dataIndex: "event_type" },
          { title: "Term", dataIndex: "term_name" },
          { title: "Academic Year", dataIndex: "academic_year" },
          { title: "Start Date", dataIndex: "start_date" },
          { title: "End Date", dataIndex: "end_date" },
          { title: "Description", dataIndex: "description" },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button onClick={() => openModal(record)}>Edit</Button>
                <Button danger onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editing ? "Edit Event" : "Add Event"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Event Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="event_type"
            label="Event Type"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "Examination", value: "exam" },
                { label: "Graduation", value: "graduation" },
                { label: "Holiday", value: "holiday" },
                { label: "Leave", value: "leave" },
                { label: "Other", value: "other" },
              ]}
            />
          </Form.Item>
          <Form.Item name="term" label="Term ID" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="date_range"
            label="Start/End Dates"
            rules={[{ required: true }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SchoolEvents;
