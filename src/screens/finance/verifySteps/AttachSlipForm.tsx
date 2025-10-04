import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Alert,
  Select,
  message as AntMessage,
} from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import type { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { listSlipUsages } from "../../../features/finance/slipUsageSlice";
import { fetchTerms } from "../../../features/administration/termAndAcademicYearSlice";
import { listReceiptAllocations } from "../../../features/finance/allocationSlice";

dayjs.extend(isBetween);

interface Props {
  form: any;
  onAttachSlip: (values: any) => void;
  onBack: () => void;
  students: any[];
  slipFound: any;
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

  const { terms } = useAppSelector(
    (state: RootState) => state.getTermsAndAcademicYears
  );
  const { receiptAllocations } = useAppSelector(
    (state: RootState) => state.getAllocations
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(listSlipUsages());

    dispatch(listReceiptAllocations())
      .unwrap()
      .catch((error: any) => {
        console.error("Error fetching receipt allocations:", error);
        AntMessage.error("Failed to load payment categories");
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

  return (
    <>
      <>
        {slipFound && (
          <Alert
            message={`Slip found. Reference: ${slipFound.reference_number}. Total amount ${slipFound.total_amount} :- Amount Remaining ${slipFound.amount_remaining}`}
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {slipFound.total_amount != slipFound.amount_remaining && (
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
                          Amount Used: {usage.amount_allocated} <br />
                          <b>Used By: {usage.student_name || "Unknown"} </b>
                          <br />
                          Date Used:{" "}
                          {new Date(usage.date_allocated).toLocaleDateString(
                            "en-GB"
                          )}
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
        <br />

        <p>
          <i>Paid Through: </i> <b>{slipFound.bank_name}</b>
        </p>

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
              loading={!receiptAllocations || receiptAllocations.length === 0}
            >
              {receiptAllocations?.map((allocation: ReceiptAllocation) => (
                <Option key={allocation.id} value={allocation.id}>
                  {allocation.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Attach Slip
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="default"
          onClick={onReset}
          style={{ marginLeft: 8, padding: "0 16px" }}
        >
          Start Over
        </Button>
      </>

      <Button style={{ marginTop: 24, padding: "0 16px" }} onClick={onBack}>
        Go Back
      </Button>
    </>
  );
};

export default AttachSlipForm;
