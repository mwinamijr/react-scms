import React from "react";
import { Form, Input, Button, Alert, Space } from "antd";
import { CheckCircleOutlined, ReloadOutlined } from "@ant-design/icons";

interface Props {
  form: any;
  slipStatus: string;
  slipMessage: string | null;
  slipError: string | null;
  selectedSlip: any;
  slipUsed: boolean;
  onVerify: (values: any) => void;
  onNext: () => void;
  onReset: () => void; // ✅ new prop
}

const VerifySlipForm: React.FC<Props> = ({
  form,
  slipStatus,
  slipMessage,
  slipError,
  selectedSlip,
  onVerify,
  onNext,
  onReset, // ✅ new prop
}) => {
  return (
    <Form form={form} onFinish={onVerify} layout="vertical">
      <Form.Item
        label="Bank Reference Number"
        name="referenceNumber"
        rules={[
          { required: true, message: "Please enter bank reference number" },
        ]}
      >
        <Input placeholder="Enter Bank Reference Number" />
      </Form.Item>

      {!slipMessage && !slipError && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={slipStatus === "loading"}
          >
            Verify Slip
          </Button>
        </Form.Item>
      )}

      {slipMessage && (
        <Alert
          message={`${slipMessage} amount remaining: ${selectedSlip?.amount_remaining}`}
          type={selectedSlip?.used ? "warning" : "success"}
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {selectedSlip?.amount_remaining <= 0 && (
        <Alert
          message="This slip has been fully used. You cannot attach it."
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {selectedSlip && slipMessage && !slipError && (
        <Button
          type="primary"
          onClick={() => {
            onNext(); // go to step 2
            onNext(); // go to step 3
          }}
          icon={<CheckCircleOutlined />}
          style={{ marginBottom: 16 }}
          disabled={selectedSlip.amount_remaining <= 0}
        >
          Proceed to Attach Slip
        </Button>
      )}

      {!selectedSlip && slipMessage && !slipError && (
        <Button
          type="primary"
          onClick={onNext}
          icon={<CheckCircleOutlined />}
          style={{ marginBottom: 16 }}
        >
          Proceed to Add Slip
        </Button>
      )}

      {slipError && (
        <Alert
          message={slipError}
          type="error"
          showIcon
          style={{ marginTop: 8 }}
        />
      )}

      {/* ✅ Reset Button */}
      {(slipMessage || slipError) && (
        <Form.Item>
          <Space>
            <Button
              onClick={() => {
                form.resetFields();
                onReset();
              }}
              icon={<ReloadOutlined />}
              danger
            >
              Reset Process
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default VerifySlipForm;
