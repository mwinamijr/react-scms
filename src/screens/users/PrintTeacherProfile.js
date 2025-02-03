import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from "../../features/user/teacherSlice";
import { Button } from "antd";

const PrintTeacherProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { teacher } = useSelector((state) => state.getTeachers);
  const printRef = useRef();

  useEffect(() => {
    dispatch(getTeacherDetails(id));
  }, [dispatch, id]);

  const handlePrint = () => {
    window.print();
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
