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

const { Title, Text } = Typography;
const { Option } = Select;

function AddReceipt() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loadingCreate, errorCreate, successCreate } = useSelector(
    (state) => state.getFinance
  );
  const { userInfo } = useSelector((state) => state.getUsers);
  const { students } = useSelector((state) => state.getStudents); // Access student list
  console.log(students);

  // Fetch student list on component mount
  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);

  // Handle form submission
  const submitHandler = (values) => {
    dispatch(createReceipt(values));
  };

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/receipts");
      AntMessage.success("Receipt created successfully!");
    }
  }, [dispatch, navigate, successCreate]);

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

      <Button type="link" onClick={() => navigate("/finance/receipts/")}>
        Go Back
      </Button>

      {userInfo.isAccountant || userInfo.isAdmin ? (
        <Card>
          <Title level={4} className="text-center">
            Hayatul Islamiya Secondary <br />
            P.O. Box 507, Babati - Manyara <br />
            Phone: 0788 030052, 0752 506523 <br />
            A/C Number: NMB, NBC
          </Title>
          <Card title="Payment Receipt" bordered className="mt-3">
            {errorCreate && <Text type="danger">{errorCreate}</Text>}

            <Form
              layout="vertical"
              form={form}
              onFinish={submitHandler}
              className="mt-3"
            >
              <Form.Item
                label="Receipt Number"
                name="receiptNumber"
                rules={[
                  { required: true, message: "Please input Receipt Number!" },
                ]}
              >
                <Input placeholder="Enter Receipt Number" />
              </Form.Item>

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
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {students.map((student) => (
                    <Option key={student.id} value={student.id}>
                      {student.first_name} {student.last_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Paid For"
                name="paidFor"
                rules={[
                  {
                    required: true,
                    message: "Please select a reason for payment!",
                  },
                ]}
              >
                <Select placeholder="Select Paid For">
                  <Option value="school fees">School Fees</Option>
                  <Option value="examination fees">Examination Fees</Option>
                  <Option value="allowances">Allowances</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  { required: true, message: "Please input the amount!" },
                ]}
              >
                <Input type="number" placeholder="Enter the payment amount" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingCreate}
                >
                  Submit Receipt
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
