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
import { createPayment } from "../../features/finance/financeSlice";

const { Title, Text } = Typography;
const { Option } = Select;

function AddPayment() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loadingCreate, errorCreate, successCreate } = useSelector(
    (state) => state.finance
  );

  const { userInfo } = useSelector((state) => state.getUsers);

  useEffect(() => {
    if (successCreate) {
      navigate("/finance/payments");
      AntMessage.success("Payment created successfully!");
    }
  }, [dispatch, successCreate, navigate]);

  const submitHandler = (values) => {
    dispatch(createPayment(values));
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
      <Button type="link" onClick={() => navigate("/finance/payments/")}>
        Go Back
      </Button>
      {userInfo.isAccountant || userInfo.isAdmin ? (
        <Card>
          <Title level={4} className="text-center">
            Hayatul Islamiya Secondary <br />
            P.O. Box 507, Babati - Manyara; Phone: 0788 030052, 0752 506523{" "}
            <br />
            A/C Number:- NMB: , NBC:
          </Title>
          <Card title="Payment Invoice" bordered>
            {errorCreate && <Text type="danger">{errorCreate}</Text>}
            {loadingCreate && <AntMessage>Loading...</AntMessage>}
            <Form
              layout="vertical"
              form={form}
              onFinish={submitHandler}
              className="mt-3"
            >
              <Form.Item
                label="Payment Number"
                name="paymentNumber"
                rules={[
                  { required: true, message: "Please input Payment Number!" },
                ]}
              >
                <Input placeholder="Enter Payment Number" />
              </Form.Item>
              <Form.Item
                label="Paid To"
                name="paidTo"
                rules={[{ required: true, message: "Please input Paid To!" }]}
              >
                <Input placeholder="Enter the recipient name" />
              </Form.Item>
              <Form.Item label="User" name="user">
                <Input placeholder="Enter user name" />
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
                <Select placeholder="Select Payment Reason">
                  <Option value="salary">Salary</Option>
                  <Option value="tour">Tour</Option>
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
                <Input type="number" placeholder="Enter payment amount" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Payment
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
