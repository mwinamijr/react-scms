import React, { useState } from "react";
import {
  Card,
  Button,
  Space,
  Select,
  List,
  Divider,
  Typography,
  message,
} from "antd";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  updatePastTermDebts,
  updateAllMissingDebts,
  updateCurrentTermDebts,
} from "../../features/finance/debtBulkActionSlice";

const { Title } = Typography;

export interface Term {
  id: number;
  name: string;
  display_name: string;
  academic_year: string;
  default_term_fee: number;
  start_date: string;
  end_date: string | null;
}
const StudentDebt: React.FC = () => {
  const dispatch = useAppDispatch();
  const [bulkLoading, setBulkLoading] = useState(false);
  const [pastLoading] = useState(false);
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [updatedStudents, setUpdatedStudents] = useState<string[]>([]);

  const allTerms = useAppSelector(
    (state: RootState) => state.getTermsAndAcademicYears?.terms
  );

  const allStudents = useAppSelector(
    (state: RootState) => state.getStudents?.students
  );

  const runUpdate = async (action: any, forPastTerm: boolean = false) => {
    setBulkLoading(true);
    setUpdatedStudents([]);
    try {
      const payload =
        forPastTerm && selectedTermId
          ? await dispatch(updatePastTermDebts([selectedTermId])).unwrap()
          : forPastTerm
          ? await dispatch(updateAllMissingDebts()).unwrap()
          : await dispatch(updateCurrentTermDebts()).unwrap();

      message.success(payload);
      // Optionally re-fetch student debt overview to get updated list
      if (selectedTermId && allStudents.length) {
        // Mock behavior: list of students updated could come from backend
        setUpdatedStudents(allStudents.map((s) => s.full_name ?? s.first_name));
      }
    } catch (e: any) {
      message.error(`Error: ${e}`);
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div>
      <Card title="Debt Management">
        <Space direction="vertical">
          <Button
            type="primary"
            onClick={() => runUpdate(updateCurrentTermDebts)}
            loading={bulkLoading}
          >
            Update Current Term Debts
          </Button>

          <Button
            onClick={() => runUpdate(updateAllMissingDebts, true)}
            loading={bulkLoading}
          >
            Update All Missing Debts
          </Button>

          <Space>
            <Select
              placeholder="Select past term"
              style={{ width: 240 }}
              onChange={(val) => setSelectedTermId(val)}
              options={allTerms.map((t: Term) => ({
                label: t.display_name,
                value: t.id,
              }))}
              disabled={bulkLoading}
            />
            <Button
              type="default"
              onClick={() => runUpdate(updatePastTermDebts, true)}
              disabled={!selectedTermId || pastLoading}
              loading={pastLoading}
            >
              Update Selected Past Term
            </Button>
          </Space>
        </Space>

        {updatedStudents.length > 0 && (
          <>
            <Divider />
            <Title level={4}>Students Updated:</Title>
            <List
              dataSource={updatedStudents}
              renderItem={(name) => <List.Item>{name}</List.Item>}
              size="small"
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default StudentDebt;
