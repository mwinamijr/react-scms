import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
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

import {
  receiptDetails,
  updateReceipt,
  resetFinanceState,
} from "../../features/finance/financeSlice";
import { listStudents } from "../../features/students/studentSlice";
import { listReceiptAllocations } from "../../features/finance/allocationSlice";

import Message from "../../components/Message";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { fetchTerms } from "../../features/administration/termAndAcademicYearSlice";

const { Title, Text } = Typography;
const { Option } = Select;

interface ReceiptFormValues {
  payer: string;
  student: number;
  paid_for: number;
  paid_through: string;
  payment_date: any;
  amount: number;
  term: number;
}

const UpdateReceipt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.getUsers);
  const { loading, error, successCreate, receipt } = useSelector(
    (state: RootState) => state.getFinance
  );
  const { loading: loadStudents, students } = useSelector(
    (state: RootState) => state.getStudents
  );
  const { receiptAllocations } = useSelector(
    (state: RootState) => state.getAllocations
  );
  const { terms } = useSelector(
    (state: RootState) => state.getTermsAndAcademicYears
  );

  // Load initial data
  useEffect(() => {
    if (id) {
      dispatch(receiptDetails(Number(id)))
        .unwrap()
        .then((data) => {
          form.setFieldsValue({
            payer: data.payer,
            student: data.student_details.id,
            paid_for: data.paid_for_details.id,
            paid_through: data.paid_through,
            payment_date: dayjs(data.date),
            amount: data.amount,
            term: data.term_details?.id,
          });
        })
        .catch((err) => {
          AntMessage.error("Failed to load receipt details");
        });
    }

    dispatch(listStudents({}));
    dispatch(listReceiptAllocations());
    dispatch(fetchTerms());
  }, [dispatch, id, form]);

  useEffect(() => {
    if (successCreate) {
      navigate(`/finance/receipts/${id}`);
      AntMessage.success("Receipt updated successfully!");
      dispatch(resetFinanceState());
    }
  }, [navigate, successCreate]);

  const submitHandler = (values: ReceiptFormValues) => {
    const formattedData = {
      ...values,
      amount: Number(values.amount),
      payment_date: dayjs(values.payment_date).format("YYYY-MM-DD"),
    };
    if (id) {
      dispatch(updateReceipt({ id: Number(id), receiptData: formattedData }));
    }
  };

  const filterStudentOption: SelectProps["filterOption"] = (input, option) => {
    if (!option || !option.children) return false;
    const studentLabel =
      (option as any).title || option["data-label"] || option.children;
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
        <Breadcrumb.Item>Update Receipt</Breadcrumb.Item>
      </Breadcrumb>

      {userInfo?.isAccountant || userInfo?.isAdmin ? (
        <Card>
          <Title level={4} className="text-center">
            Hayatul Islamiya Secondary <br />
            P.O. Box 507, Babati - Manyara <br />
            Phone: 0788 030052, 0752 506523 <br />
            A/C Number: NMB, NBC
          </Title>

          <Card title="Update Payment Receipt" bordered className="mt-3">
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
                  { required: true, message: "Please input payer name!" },
                ]}
              >
                <Input placeholder="Enter payer name" />
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
                  placeholder="Select a student"
                  filterOption={filterStudentOption}
                  loading={loadStudents}
                >
                  {students?.map((student) => (
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
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select placeholder="Select category">
                  {receiptAllocations?.map((allocation) => (
                    <Option key={allocation.id} value={allocation.id}>
                      {allocation.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Paid Through"
                name="paid_through"
                rules={[{ required: true, message: "Please select method!" }]}
              >
                <Select placeholder="Select Payment Method">
                  <Option value="NMB">NMB</Option>
                  <Option value="NBC">NBC</Option>
                  <Option value="CRDB">CRDB</Option>
                  <Option value="HATI MALIPO">HATI MALIPO</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Payment Date"
                name="payment_date"
                rules={[{ required: true, message: "Select payment date!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Term"
                name="term"
                rules={[{ required: true, message: "Please select a term!" }]}
              >
                <Select placeholder="Select Term">
                  {terms?.map((term) => (
                    <Option key={term.id} value={term.id}>
                      {term.name} - {term.academic_year_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Amount"
                name="amount"
                rules={[
                  { required: true, message: "Enter amount!" },
                  {
                    validator: (_, value) => {
                      const numValue = Number(value);
                      if (isNaN(numValue)) {
                        return Promise.reject("Enter valid number");
                      }
                      if (numValue <= 0) {
                        return Promise.reject("Must be greater than 0");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input type="number" min={1} step="0.01" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Updating Receipt..." : "Update Receipt"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Card>
      ) : (
        <Card>
          <Text type="danger">
            You are not authorized to view this page. Please contact the Admin.
          </Text>
        </Card>
      )}
    </div>
  );
};

export default UpdateReceipt;
