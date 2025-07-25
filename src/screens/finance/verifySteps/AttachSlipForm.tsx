import React from "react";
import { Form, Input, Button, Alert, Select, Spin } from "antd";
import type { RootState } from "../../../app/store";
import { useAppSelector } from "../../../app/hooks";

interface Props {
  form: any;
  onAttachSlip: (values: any) => void;
  onBack: () => void;
  students: any[];
  loading: boolean;
}

const AttachSlipForm: React.FC<Props> = ({
  form,
  onAttachSlip,
  onBack,
  slipFound,
  students,
  loading,
}) => {
  const { slipUsages } = useAppSelector(
    (state: RootState) => state.getSlipUsages
  );
  const slipUsage = slipUsages.find((usage) => usage.id === slipFound?.id);
  return (
    <>
      {loading ? (
        <Spin />
      ) : slipFound ? (
        <>
          {slipFound && (
            <Alert
              message={`Slip found. Reference: ${slipFound.reference_number} \n Amount Remaining ${slipFound.amount_remaining}`}
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {slipFound.used && (
            <>
              {" "}
              <Alert
                message="This slip has been used in a receipt. "
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
              <Alert
                message={`Amount Used: ${slipUsage?.amount_used} \n Used By: ${
                  slipUsage?.used_by || "Unknown"
                } \n Date Used: ${new Date(
                  slipUsage?.date_used
                ).toLocaleDateString()}`}
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            </>
          )}

          {slipFound.total_amount == slipFound.amount_remaining && (
            <Alert
              message="This slip has not been used in any receipt."
              type="info"
              showIcon
            />
          )}

          <Form
            form={form}
            onFinish={onAttachSlip}
            layout="vertical"
            style={{ marginTop: 24 }}
            initialValues={{ amount_allocated: "", student: null }}
          >
            <Form.Item
              label="Student"
              name="student"
              rules={[{ required: true, message: "Please select a student" }]}
            >
              <Select
                showSearch
                placeholder="Select student"
                filterOption={(input, option) =>
                  option?.children?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {students.map((s) => (
                  <Select.Option key={s.id} value={s.id}>
                    {s.full_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Amount Allocated"
              name="amount_allocated"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Attach Slip
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          <p>Nothing elese go back</p>
        </>
      )}

      <Button style={{ marginTop: 24 }} onClick={onBack}>
        Go Back
      </Button>
    </>
  );
};

export default AttachSlipForm;
