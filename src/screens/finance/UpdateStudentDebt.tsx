import React, { useEffect, useState } from "react";
import { Table, Button, message, Card, Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchStudentsDebt,
  updateStudentDebt,
  reverseStudentDebt,
} from "../../features/students/debtSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

interface StudentDebt {
  id: number;
  admission_number: string;
  full_name: string;
  current_term: string;
  debt: number;
}

const StudentDebtManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, loading, error } = useSelector(
    (state: RootState) => state.studentDebt
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    dispatch(fetchStudentsDebt());
  }, [dispatch]);

  const handleUpdateDebt = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select students to update debt.");
      return;
    }
    dispatch(updateStudentDebt(selectedRowKeys))
      .unwrap()
      .then(() => {
        message.success("Debt updated successfully!");
        setSelectedRowKeys([]);
      })
      .catch(() => message.error("Failed to update debt."));
  };

  const handleReverseDebt = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select students to reverse debt.");
      return;
    }
    dispatch(reverseStudentDebt(selectedRowKeys))
      .unwrap()
      .then(() => {
        message.success("Debt reversed successfully!");
        setSelectedRowKeys([]);
      })
      .catch(() => message.error("Failed to reverse debt."));
  };

  const columns = [
    {
      title: "Admission Number",
      dataIndex: "admission_number",
      key: "admission_number",
    },
    {
      title: "Student Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Current Term",
      dataIndex: "current_term",
      key: "current_term",
    },
    {
      title: "Debt Amount",
      dataIndex: "debt",
      key: "debt",
      render: (text: number) => `TSh ${text.toLocaleString()}`,
    },
  ];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Finance</Breadcrumb.Item>
        <Breadcrumb.Item>Student Debt Management</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Student Debt Management">
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
          }}
          loading={loading}
          columns={columns}
          dataSource={students}
          rowKey="id"
        />

        <Button
          type="primary"
          onClick={handleUpdateDebt}
          style={{ marginRight: 10 }}
        >
          Update Debt
        </Button>
        <Button type="default" onClick={handleReverseDebt} danger>
          Reverse Debt
        </Button>
      </Card>
    </div>
  );
};

export default StudentDebtManagement;
