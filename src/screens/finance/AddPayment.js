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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createPayment } from "../../features/finance/financeSlice";
import { listTeachers } from "../../features/user/teacherSlice";
import { listPaymentAllocations } from "../../features/finance/allocationSlice";

const { Title, Text } = Typography;
const { Option } = Select;

function AddPayment() {
  const [form] = Form.useForm();
  const [isEmployee, setIsEmployee] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successCreate } = useSelector(
    (state) => state.getFinance
  );

  const { loading: loadTeachers, teachers } = useSelector(
    (state) => state.getTeachers
  );
  const { loading: allocationLoading, paymentAllocations } = useSelector(
    (state) => state.getAllocations
  );

  const { userInfo } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(listTeachers());
    dispatch(listPaymentAllocations());
  }, [dispatch]);

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/payments");
      AntMessage.success("Payment created successfully!");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    if (isEmployee) {
      const getTeacher = teachers.find((teacher) => {
        return teacher.id === values.user;
      });
      const formattedData = {
        ...values,
        paid_to: `${getTeacher.first_name} ${getTeacher.last_name}`,
        paid_by_id: userInfo.id,
      };
      dispatch(createPayment(formattedData));
      console.log("formated", formattedData);
    } else {
      console.log("values:", values);
      dispatch(createPayment({ ...values, paid_by_id: userInfo.id }));
    }
  };

  const filterUserOption = (input, option) => {
    if (!option || !option.children) return false;

    // Handle when children is a string
    if (typeof option.children === "string") {
      return option.children.toLowerCase().includes(input.toLowerCase());
    }

    // Handle when children are React nodes (first_name + last_name)
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

      {userInfo.isAccountant || userInfo.isAdmin ? (
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
                  {loading ? "submitting payment" : "Submit Payment"}
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

export default AddPayment;
