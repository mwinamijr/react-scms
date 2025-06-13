import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeacherDetails } from "../../features/user/teacherSlice";
import { Button } from "antd";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  designation: string;
  salary: number;
}

const PrintTeacherProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const teacher = useSelector(
    (state: RootState) => state.getTeachers.teacher
  ) as Teacher | null;

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      dispatch(getTeacherDetails(Number(id)));
    }
  }, [dispatch, id]);

  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  return (
    <div ref={printRef} className="print-container">
      {teacher ? (
        <div className="profile-print">
          <h2>
            {teacher.first_name} {teacher.last_name}
          </h2>
          <p>
            <strong>Email:</strong> {teacher.email}
          </p>
          <p>
            <strong>Phone:</strong> {teacher.phone_number}
          </p>
          <p>
            <strong>Address:</strong> {teacher.address}
          </p>
          <p>
            <strong>Designation:</strong> {teacher.designation}
          </p>
          <p>
            <strong>Salary:</strong> ${teacher.salary}
          </p>
          <Button type="primary" onClick={handlePrint} className="print-btn">
            Print Profile
          </Button>
        </div>
      ) : (
        <p>No teacher details found.</p>
      )}
    </div>
  );
};

export default PrintTeacherProfile;
