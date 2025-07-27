import React, { useEffect } from "react";
import { Form, Input, Button, Alert, Select, Spin } from "antd";
import type { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { listSlipUsages } from "../../../features/finance/slipUsageSlice";

interface Props {
  form: any;
  onAttachSlip: (values: any) => void;
  onBack: () => void;
  students: any[];
  loading: boolean;
  onReset: () => void;
}

const AttachSlipForm: React.FC<Props> = ({
  form,
  onAttachSlip,
  onBack,
  slipFound,
  students,
  loading,
  onReset,
}) => {
  const { slipUsages } = useAppSelector(
    (state: RootState) => state.getSlipUsages
  );
  const slipUsage = slipUsages.filter(
    (usage) => usage.slip_ref === slipFound?.reference_number
  );
  console.log(slipUsage);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(listSlipUsages());
  }, [dispatch]);

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

          <p>{slipFound.payment_date}</p>

          {slipFound.used && (
            <>
              {" "}
              <Alert
                message="This slip has been used in a receipt. "
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
              {slipUsage.length > 0 && (
                <Alert
                  message={
                    <div>
                      <strong>Slip Usage:</strong>
                      <ul style={{ marginLeft: 16 }}>
                        {slipUsage.map((usage, index) => (
                          <li key={index}>
                            Amount Used: {usage.amount_used} <br />
                            Used By: {usage.used_by || "Unknown"} <br />
                            Date Used:{" "}
                            {new Date(usage.date_used).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}
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
          <Button type="default" onClick={onReset} style={{ marginLeft: 8 }}>
            Start Over
          </Button>
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
