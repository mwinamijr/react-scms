import React, { useEffect, useState } from "react";
import { Steps, Typography } from "antd";
import {
  FileAddOutlined,
  FileSearchOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchBankSlipByNumber,
  createBankSlip,
  clearSelectedSlip,
  clearSlipMessages,
} from "../../features/finance/bankSlipSlice";
import { createSlipUsage } from "../../features/finance/slipUsageSlice";
import { listStudents } from "../../features/students/studentSlice";
import VerifySlipForm from "./verifySteps/VerifySlipForm";
import AddSlipForm from "./verifySteps/AddSlipForm";
import AttachSlipForm from "./verifySteps/AttachSlipForm";
import type { RootState } from "../../app/store";
import { Form, message } from "antd";

const { Step } = Steps;
const { Title } = Typography;

const VerifySlips: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [addError, setAddError] = useState<string | null>(null);
  const [catchRefNumber, setCatchRefNumber] = useState<string | null>(null);

  const { selectedSlip, slipStatus, slipError, slipMessage } = useAppSelector(
    (state: RootState) => state.getBankSlips
  );
  const { students } = useAppSelector((state: RootState) => state.getStudents);
  const { userInfo } = useAppSelector((state: RootState) => state.getUsers);

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const handleVerify = async (values: any) => {
    dispatch(clearSelectedSlip());
    setCatchRefNumber(values.referenceNumber);
    await dispatch(fetchBankSlipByNumber(values.referenceNumber));
  };

  const handleAddSlip = async (values: any) => {
    setAddError(null);

    try {
      const payload = {
        ...values,
        uploaded_by_id: userInfo?.id,
      };

      const result = await dispatch(createBankSlip(payload)).unwrap();

      if (result) {
        message.success("Bank slip added successfully");

        // Optional: Wait for the bank slip to be refetched by reference number
        try {
          await dispatch(
            fetchBankSlipByNumber(values.reference_number)
          ).unwrap();
        } catch (fetchError) {
          console.warn("Failed to fetch slip by reference:", fetchError);
        }

        next(); // move to next step
      }
    } catch (error: any) {
      setAddError(error?.message || "Failed to add bank slip");
    }
  };

  const handleAttachSlip = async (values: any) => {
    try {
      const payload = {
        ...values,
        slip: selectedSlip?.id,
      };
      await dispatch(createSlipUsage(payload)).unwrap();
      message.success("Slip successfully attached to student");
      next();
    } catch (error) {
      message.error("Failed to attach slip to student");
      console.error("Attach Slip Error:", error);
    }
  };

  const handleReset = () => {
    form.resetFields(); // clear form fields
    dispatch(clearSelectedSlip()); // clear slip from Redux
    dispatch(clearSlipMessages());
    setCurrent(0); // return to step 0
    setAddError(null);
    setCatchRefNumber(null);
  };

  useEffect(() => {
    if (selectedSlip?.id) {
      dispatch(listStudents({}));
    }
  }, [selectedSlip, dispatch]);

  const steps = [
    {
      title: "Verify Bank Slip",
      icon: <FileSearchOutlined />,
      content: (
        <VerifySlipForm
          form={form}
          slipStatus={slipStatus}
          slipMessage={slipMessage}
          slipError={slipError}
          selectedSlip={selectedSlip}
          onVerify={handleVerify}
          onNext={next}
          onReset={handleReset}
        />
      ),
    },
    {
      title: "Add Bank Slip",
      icon: <FileAddOutlined />,
      content: (
        <AddSlipForm
          form={form}
          refNumber={catchRefNumber}
          slipStatus={slipStatus}
          addError={addError}
          onAddSlip={handleAddSlip}
          onBack={prev}
        />
      ),
    },
    {
      title: "Attach Slip to Student",
      icon: <CheckCircleOutlined />,
      content: (
        <AttachSlipForm
          form={form}
          onAttachSlip={handleAttachSlip}
          students={students}
          slipFound={selectedSlip}
          onBack={prev}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Verify Bank Slips</Title>
      <Steps current={current} style={{ marginBottom: 32 }}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} icon={step.icon} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
    </div>
  );
};

export default VerifySlips;
