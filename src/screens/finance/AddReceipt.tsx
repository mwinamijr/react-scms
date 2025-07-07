import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  Breadcrumb,
  DatePicker,
  Typography,
  Select,
  message as AntMessage,
} from "antd";
import dayjs from "dayjs";
import type { SelectProps } from "antd";
import { createReceipt } from "../../features/finance/financeSlice";
import { listStudents } from "../../features/students/studentSlice";
import { listReceiptAllocations } from "../../features/finance/allocationSlice";
import Message from "../../components/Message";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

const { Title, Text } = Typography;
const { Option } = Select;

interface ReceiptFormValues {
  payer: string;
  student: number;
  paid_for: number;
  paid_through: string;
  payment_date: any;
  amount: number;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
}

interface ReceiptAllocation {
  id: number;
  name: string;
}

const AddReceipt: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate } = useSelector(
    (state: RootState) => state.getFinance
  );

  const { userInfo } = useSelector((state: RootState) => state.getUsers);
  const { loading: loadStudents, students } = useSelector(
    (state: RootState) => state.getStudents
  );
  const { receiptAllocations } = useSelector(
    (state: RootState) => state.getAllocations
  );

  useEffect(() => {
    dispatch(
      listStudents({
        first_name: "",
        middle_name: "",
        last_name: "",
        class_level: "",
      })
    )
      .unwrap()
      .catch((error: any) => {
        console.error("Error fetching students:", error);
        AntMessage.error("Failed to load students list");
      });

    dispatch(listReceiptAllocations())
      .unwrap()
      .catch((error: any) => {
        console.error("Error fetching receipt allocations:", error);
        AntMessage.error("Failed to load payment categories");
      });
  }, [dispatch]);

  const submitHandler = (values: ReceiptFormValues) => {
    const formattedData = {
      ...values,
      received_by: userInfo?.id,
      amount: Number(values.amount),
      payment_date: dayjs(values.payment_date).format("YYYY-MM-DD"),
    };
    dispatch(createReceipt(formattedData));
  };

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/receipts");
      AntMessage.success("Receipt created successfully!");
    }
  }, [navigate, successCreate]);

  const filterStudentOption: SelectProps["filterOption"] = (input, option) => {
    if (!option || !option.children) return false;

    if (typeof option.children === "string") {
      return (option.children as string)
        .toLowerCase()
        .includes(input.toLowerCase());
    }

    const studentLabel = (option as any).title || option["data-label"] || "";
    return (
      typeof studentLabel === "string" &&
      studentLabel.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/receipts/">Receipts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Receipt</Breadcrumb.Item>
      </Breadcrumb>

      {userInfo?.isAccountant || userInfo?.isAdmin ? (
        <Card>
          <Title level={4} className="text-center">
            Hayatul Islamiya Secondary <br />
            P.O. Box 507, Babati - Manyara <br />
            Phone: 0788 030052, 0752 506523 <br />
            A/C Number: NMB, NBC
          </Title>
          <Card title="Payment Receipt" bordered className="mt-3">
            {error && <Message variant="danger">{error}</Message>}

            <Form
              layout="vertical"
              form={form}
              onFinish={submitHandler}
              className="mt-3"
            >
              <Form.Item
                label="Payer"
                name="payer"
                rules={[
                  { required: true, message: "Please input Payer name!" },
                ]}
              >
                <Input placeholder="Enter the name of the payer" />
              </Form.Item>

              <Form.Item
                label="Student"
                name="student"
                rules={[
                  { required: true, message: "Please select a student!" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Search and select a student"
                  optionFilterProp="children"
                  filterOption={filterStudentOption}
                  loading={loadStudents}
                  notFoundContent={
                    loadStudents ? "Loading students..." : "No student found"
                  }
                >
                  {students?.map((student: Student) => (
                    <Option
                      key={student.id}
                      value={student.id}
                      title={`${student.first_name} ${student.last_name}`}
                      data-label={`${student.first_name} ${student.last_name}`}
                    >
                      {student.first_name} {student.last_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Paid For"
                name="paid_for"
                rules={[
                  {
                    required: true,
                    message: "Please select a reason for payment!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Paid For"
                  loading={
                    !receiptAllocations || receiptAllocations.length === 0
                  }
                >
                  {receiptAllocations?.map((allocation: ReceiptAllocation) => (
                    <Option key={allocation.id} value={allocation.id}>
                      {allocation.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Paid Through"
                name="paid_through"
                rules={[
                  {
                    required: true,
                    message: "Please select a method for payment!",
                  },
                ]}
              >
                <Select placeholder="Select Payment Method">
                  <Option key="NMB" value="NMB">
                    NMB
                  </Option>
                  <Option key="NBC" value="NBC">
                    NBC
                  </Option>
                  <Option key="CRDB" value="CRDB">
                    CRDB
                  </Option>
                  <Option key="HATI MALIPO" value="HATI MALIPO">
                    HATI MALIPO
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Payment Date"
                name="payment_date"
                rules={[
                  {
                    required: true,
                    message: "Please select a date for payment!",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Payment Date"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  { required: true, message: "Please input the amount!" },
                  {
                    validator: (_, value) => {
                      const numValue = Number(value);
                      if (isNaN(numValue)) {
                        return Promise.reject("Please enter a valid number");
                      }
                      if (numValue <= 0) {
                        return Promise.reject("Amount must be greater than 0");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter the payment amount"
                  min={1}
                  step="0.01"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Submitting Receipt..." : "Submit Receipt"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Card>
      ) : (
        <Card>
          <Text type="danger">
            You are not authorized to view this page. Please contact the Admin
            for further details.
          </Text>
        </Card>
      )}
    </div>
  );
};

export default AddReceipt;
