import React, { useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Breadcrumb,
  Typography,
  Select,
  message as AntMessage,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createReceipt } from "../../features/finance/financeSlice";
import { listStudents } from "../../features/students/studentSlice"; // Action to fetch students
import { listReceiptAllocations } from "../../features/finance/allocationSlice";
import Message from "../../components/Message";

const { Title, Text } = Typography;
const { Option } = Select;

function AddReceipt() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error, successCreate } = useSelector(
    (state) => state.getFinance
  );
  const { userInfo } = useSelector((state) => state.getUsers);
  const { students } = useSelector((state) => state.getStudents);
  const { receiptAllocations } = useSelector((state) => state.getAllocations);

  // Fetch student list and receipt allocations on component mount
  useEffect(() => {
    // Dispatch with a callback to handle any potential errors
    dispatch(
      listStudents({
        first_name: "",
        middle_name: "",
        last_name: "",
        class_level: "",
      })
    )
      .unwrap()
      .catch((error) => {
        console.error("Error fetching students:", error);
        AntMessage.error("Failed to load students list");
      });

    dispatch(listReceiptAllocations())
      .unwrap()
      .catch((error) => {
        console.error("Error fetching receipt allocations:", error);
        AntMessage.error("Failed to load payment categories");
      });
  }, [dispatch]);

  // Handle form submission
  const submitHandler = (values) => {
    const formattedData = {
      ...values,
      received_by: userInfo?.id,
      amount: Number(values.amount),
    };
    dispatch(createReceipt(formattedData));
  };

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/receipts");
      AntMessage.success("Receipt created successfully!");
    }
  }, [navigate, successCreate]);

  // Create a safe filter function that works with both string and React node children
  const filterStudentOption = (input, option) => {
    if (!option || !option.children) return false;

    // Handle when children is a string
    if (typeof option.children === "string") {
      return option.children.toLowerCase().includes(input.toLowerCase());
    }

    // Handle when children are React nodes (first_name + last_name)
    const studentLabel = option.title || option["data-label"] || "";
    return studentLabel.toLowerCase().includes(input.toLowerCase());
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

      {userInfo.isAccountant || userInfo.isAdmin ? (
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
                  loading={!students || students.length === 0}
                  notFoundContent={
                    !students || students.length === 0
                      ? "Loading students..."
                      : "No student found"
                  }
                >
                  {students &&
                    students.map((student) => (
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
                  {receiptAllocations &&
                    receiptAllocations.map((allocation) => (
                      <Option key={allocation.id} value={allocation.id}>
                        {allocation.name}
                      </Option>
                    ))}
                </Select>
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
                  {loading ? "submitting receipt" : "Submit Receipt"}
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
}

export default AddReceipt;
