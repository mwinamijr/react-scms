import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Breadcrumb,
  Checkbox,
  Typography,
  Select,
  message as AntMessage,
} from "antd";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createPayment } from "../../features/finance/financeSlice";
import { listTeachers } from "../../features/user/teacherSlice";
import { listPaymentAllocations } from "../../features/finance/allocationSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

const { Title, Text } = Typography;
const { Option } = Select;

interface PaymentFormValues {
  user?: number;
  paid_to?: string;
  paid_for_id: number;
  amount: number;
}

const AddPayment: React.FC = () => {
  const [form] = Form.useForm();
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate } = useSelector(
    (state: RootState) => state.getFinance
  );

  const { loading: loadTeachers, teachers } = useSelector(
    (state: RootState) => state.getTeachers
  );

  const { loading: allocationLoading, paymentAllocations } = useSelector(
    (state: RootState) => state.getAllocations
  );

  const { userInfo } = useSelector((state: RootState) => state.getUsers);

  useEffect(() => {
    dispatch(listTeachers({}));
    dispatch(listPaymentAllocations());
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/payments");
      AntMessage.success("Payment created successfully!");
    }
  }, [successCreate, navigate]);

  const submitHandler = (values: PaymentFormValues) => {
    if (!userInfo) return;

    if (isEmployee) {
      const getTeacher = teachers.find((teacher) => teacher.id === values.user);
      if (!getTeacher) return;

      const formattedData = {
        ...values,
        paid_to: `${getTeacher.first_name} ${getTeacher.last_name}`,
        paid_by_id: userInfo.id,
      };
      dispatch(createPayment(formattedData));
    } else {
      dispatch(createPayment({ ...values, paid_by_id: userInfo.id }));
    }
  };

  const filterUserOption = (input: string, option?: any) => {
    if (!option || !option.children) return false;

    const userLabel = option.title || option["data-label"] || "";
    return userLabel.toLowerCase().includes(input.toLowerCase());
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/finance/payments/">Payments</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Payment</Breadcrumb.Item>
      </Breadcrumb>

      {userInfo?.isAccountant || userInfo?.isAdmin ? (
        <Card>
          <Title level={4} className="text-center">
            Hayatul Islamiya Secondary <br />
            P.O. Box 507, Babati - Manyara; Phone: 0788 030052, 0752 506523{" "}
            <br />
            A/C Number:- NMB: , NBC:
          </Title>
          <Card title="Payment Invoice" bordered>
            {error && <Text type="danger">{error}</Text>}
            <Form
              layout="vertical"
              form={form}
              onFinish={submitHandler}
              className="mt-3"
            >
              <Form.Item>
                <Checkbox
                  checked={isEmployee}
                  onChange={(e) => setIsEmployee(e.target.checked)}
                >
                  Is Employee?
                </Checkbox>
              </Form.Item>

              {isEmployee ? (
                <Form.Item
                  label="User"
                  name="user"
                  rules={[{ required: true, message: "Please select a user!" }]}
                >
                  <Select
                    showSearch
                    placeholder="Search and select a user"
                    optionFilterProp="children"
                    filterOption={filterUserOption}
                    loading={loadTeachers}
                    notFoundContent={
                      loadTeachers ? "Loading teachers..." : "No teacher found"
                    }
                  >
                    {teachers &&
                      teachers.map((teacher) => (
                        <Option
                          key={teacher.id}
                          value={teacher.id}
                          title={`${teacher.first_name} ${teacher.last_name}`}
                          data-label={`${teacher.first_name} ${teacher.last_name}`}
                        >
                          {teacher.first_name} {teacher.last_name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item
                  label="Paid To"
                  name="paid_to"
                  rules={[{ required: true, message: "Please input Paid To!" }]}
                >
                  <Input placeholder="Enter the recipient name" />
                </Form.Item>
              )}

              <Form.Item
                label="Paid For"
                name="paid_for_id"
                rules={[
                  {
                    required: true,
                    message: "Please select a reason for payment!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Payment reason"
                  loading={allocationLoading}
                >
                  {paymentAllocations &&
                    paymentAllocations.map((allocation) => (
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
                ]}
              >
                <Input type="number" placeholder="Enter payment amount" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Submitting Payment..." : "Submit Payment"}
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

export default AddPayment;
