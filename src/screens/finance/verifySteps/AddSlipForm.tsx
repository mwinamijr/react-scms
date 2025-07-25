import React from "react";
import { Form, Input, Button, Alert, Select } from "antd";

const { Option } = Select;

interface Props {
  form: any;
  slipStatus: string;
  refNumber: string;
  onAddSlip: (values: any) => void;
  addError: string | null;
  onBack: () => void;
}

const AddSlipForm: React.FC<Props> = ({
  form,
  slipStatus,
  onAddSlip,
  refNumber,
  addError,
  onBack,
}) => {
  return (
    <>
      {addError && (
        <Alert
          message={addError}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form
        form={form}
        onFinish={onAddSlip}
        layout="vertical"
        initialValues={{
          bank_name: "",
          reference_number: refNumber || "",
          payment_date: "",
          total_amount: "",
          used: false,
          note: "",
          uploaded_by_id: null,
        }}
      >
        <Form.Item
          label="Bank Name"
          name="bank_name"
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
          </Select>
        </Form.Item>
        <Form.Item
          label="Reference Number"
          name="reference_number"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Payment Date"
          name="payment_date"
          rules={[{ required: true }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Total Amount"
          name="total_amount"
          rules={[{ required: true }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Note" name="note">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={slipStatus === "loading"}
          >
            Add Slip
          </Button>
        </Form.Item>
      </Form>

      <Button style={{ marginTop: 24 }} onClick={onBack}>
        Go Back
      </Button>
    </>
  );
};

export default AddSlipForm;
