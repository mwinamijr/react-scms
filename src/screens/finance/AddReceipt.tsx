import React, { useEffect } from "react";
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
import isBetween from "dayjs/plugin/isBetween";
import type { SelectProps } from "antd";
import {
  createReceipt,
  resetFinanceState,
} from "../../features/finance/receiptSlice";
import { listReceiptAllocations } from "../../features/finance/allocationSlice";
import Message from "../../components/Message";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTerms } from "../../features/administration/termAndAcademicYearSlice";
import { listSlipUsages } from "../../features/finance/slipUsageSlice";

dayjs.extend(isBetween);

const { Title, Text } = Typography;
const { Option } = Select;

interface ReceiptFormValues {
  payer: string;
  student: number;
  paid_for: number;
  paid_through: string;
  payment_date: any;
  amount: number;
  term: number | null;
}

interface SlipUsage {
  id: number;
  slip: number;
  student_name: string;
  amount_used: number;
  used: boolean;
  used_by?: string;
  date_used: string;
}

interface ReceiptAllocation {
  id: number;
  name: string;
}

const AddReceipt: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate } = useAppSelector(
    (state: RootState) => state.getReceipts
  );

  const { userInfo } = useAppSelector((state: RootState) => state.getUsers);

  const { slipUsages, loading: slipUsageLoading } = useAppSelector(
    (state: RootState) => state.getSlipUsages
  );
  console.log("Slip Usages from Redux:", slipUsages);
  const availableSlipUsages = slipUsages?.filter(
    (slip: SlipUsage) => !slip.used
  );

  const { receiptAllocations } = useAppSelector(
    (state: RootState) => state.getAllocations
  );
  const { terms } = useAppSelector(
    (state: RootState) => state.getTermsAndAcademicYears
  );

  useEffect(() => {
    dispatch(listReceiptAllocations())
      .unwrap()
      .catch((error: any) => {
        console.error("Error fetching receipt allocations:", error);
        AntMessage.error("Failed to load payment categories");
      });

    dispatch(listSlipUsages())
      .unwrap()
      .catch((error: any) => {
        console.error("Error fetching slip usages:", error);
        AntMessage.error("Failed to load slip usages");
      });

    dispatch(fetchTerms())
      .unwrap()
      .then((fetchedTerms) => {
        const today = dayjs();

        const currentTerm = fetchedTerms.find((term) =>
          today.isBetween(
            dayjs(term.start_date),
            dayjs(term.end_date),
            null,
            "[]"
          )
        );

        if (currentTerm) {
          form.setFieldsValue({ term: currentTerm.id });
        }
      })
      .catch((error: any) => {
        console.error("Error fetching terms:", error);
        AntMessage.error("Failed to load academic terms");
      });
  }, [dispatch, form]);

  const submitHandler = (values: ReceiptFormValues & { used_slip: number }) => {
    const formattedData = {
      ...values,
      received_by: userInfo?.id,
      amount: Number(values.amount),
      payment_date: dayjs(values.payment_date).format("YYYY-MM-DD"),
      term: values.term ? Number(values.term) : null,
    };
    dispatch(createReceipt(formattedData));
  };

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/receipts");
      AntMessage.success("Receipt created successfully!");
      dispatch(resetFinanceState());
    }
  }, [dispatch, navigate, successCreate]);

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

  // when student is selected, auto fill the form
  const handleStudentChange = (studentId: number) => {
    const slip = availableSlipUsages.find((s: any) => s.student === studentId);

    if (slip) {
      form.setFieldsValue({
        used_slip: slip.id,
        payer: slip.student_name,
        student: slip.student,
        amount: slip.amount_allocated,
        term: slip.term_details.id,
        payment_date: dayjs(slip.payment_date),
        paid_through: slip.paid_through,
        paid_for: slip.paid_for_details.id,
      });
    }
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
              initialValues={
                {
                  payment_date: dayjs(),
                } as ReceiptFormValues
              }
            >
              <Form.Item name="used_slip" hidden>
                <Input type="hidden" />
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
                  filterOption={filterStudentOption}
                  loading={slipUsageLoading}
                  onChange={handleStudentChange} // 🔑 trigger prefill
                  notFoundContent={
                    slipUsageLoading
                      ? "Loading students..."
                      : "No student found"
                  }
                >
                  {availableSlipUsages?.map((slip: any) => (
                    <Option
                      key={slip.student}
                      value={slip.student}
                      title={slip.student_name}
                      data-label={slip.student_name}
                    >
                      {slip.student_name}
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
                label="Term"
                name="term"
                rules={[
                  {
                    required: true,
                    message: "Please select an academic term!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Term"
                  loading={!terms || terms.length === 0}
                >
                  {terms?.map((term) => (
                    <Option key={term.id} value={term.id}>
                      {term.name} - {term.academic_year_name}
                    </Option>
                  ))}
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
