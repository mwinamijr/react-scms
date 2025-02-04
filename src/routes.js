import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./screens/Dashboard";
import UserList from "./screens/users/UserList";
import AddAccountant from "./screens/users/AddAccountant";
import TeacherList from "./screens/users/TeacherList";
import TeacherDetails from "./screens/users/TeacherDetails";
import AddTeacher from "./screens/users/AddTeacher";
import TeacherBulkUpload from "./screens/users/TeacherBulkUpload";
import EditTeacherProfile from "./screens/users/EditTeacherProfile";
import PrintTeacherProfile from "./screens/users/PrintTeacherProfile";
import AccountantList from "./screens/users/AccountantList";
import AccountantDetails from "./screens/users/AccountantDetails";
import UserProfile from "./screens/users/UserProfile";
import ParentList from "./screens/users/ParentList";
import ParentDetails from "./screens/users/ParentDetails";
import Assignment from "./screens/notification/Sms";
import Payments from "./screens/finance/PaymentList";
import Receipts from "./screens/finance/ReceiptList";
import Payroll from "./screens/finance/Payroll";
import Reports from "./screens/finance/Reports";
import StudentList from "./screens/students/StudentList";
import StudentDetailsScreen from "./screens/students/StudentDetails";
import AddStudent from "./screens/students/AddStudent";
import AddReceipt from "./screens/finance/AddReceipt";
import BulkUpload from "./screens/students/BulkUpload";
import ReceiptsDetails from "./screens/finance/ReceiptsDetails";
import PaymentDetails from "./screens/finance/PaymentDetails";
import AddPayment from "./screens/finance/AddPayment";
import SubjectList from "./screens/academic/subjects/SubjectList";
import SubjectDetails from "./screens/academic/subjects/SubjectDetails";
import AddSubject from "./screens/academic/subjects/AddSubject";
import UpdateSubject from "./screens/academic/subjects/UpdateSubject";
import SubjectBulkUpload from "./screens/academic/subjects/BulkUpload";
import DepartmentList from "./screens/academic/departments/DepartmentList";
import DepartmentDetails from "./screens/academic/departments/DepartmentDetails";
import AddDepartment from "./screens/academic/departments/AddDepartment";
import UpdateDepartment from "./screens/academic/departments/UpdateDepartment";

const BaseRouter = () => {
  // Access userInfo from the user slice
  const { userInfo } = useSelector((state) => state.getUsers);

  if (userInfo) {
    <Navigate replace to="/dashboard" />;
  }
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="academic/">
          <Route path="departments" element={<DepartmentList />} />
          <Route path="departments/:id" element={<DepartmentDetails />} />
          <Route path="departments/add" element={<AddDepartment />} />
          <Route path="departments/:id/edit" element={<UpdateDepartment />} />
          <Route path="subjects" element={<SubjectList />} />
          <Route path="subjects/:id" element={<SubjectDetails />} />
          <Route path="subjects/add" element={<AddSubject />} />
          <Route path="subjects/upload" element={<SubjectBulkUpload />} />
          <Route path="subjects/:id/edit" element={<UpdateSubject />} />
        </Route>

        <Route path="finance/">
          <Route path="receipts/" element={<Receipts />} />
          <Route path="receipts/:id" element={<ReceiptsDetails />} />
          <Route path="receipts/add/" element={<AddReceipt />} />
          <Route path="payments/" element={<Payments />} />
          <Route path="payments/:id" element={<PaymentDetails />} />
          <Route path="payments/add/" element={<AddPayment />} />
          <Route path="payroll/" element={<Payroll />} />
          <Route path="reports/" element={<Reports />} />
        </Route>

        <Route path="sis/">
          <Route path="students/" element={<StudentList />} />
          <Route path="students/:id" element={<StudentDetailsScreen />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/upload" element={<BulkUpload />} />
        </Route>
        <Route path="users" element={<UserList />} />
        <Route path="users/parents" element={<ParentList />} />
        <Route path="users/parents/:id" element={<ParentDetails />} />
        <Route path="users/teachers" element={<TeacherList />} />
        <Route path="users/teachers/add" element={<AddTeacher />} />
        <Route path="users/teachers/upload" element={<TeacherBulkUpload />} />
        <Route path="users/teachers/:id" element={<TeacherDetails />} />
        <Route
          path="/users/teachers/:id/edit"
          element={<EditTeacherProfile />}
        />
        <Route
          path="/users/teachers/:id/print"
          element={<PrintTeacherProfile />}
        />
        <Route path="users/accountants/" element={<AccountantList />} />
        <Route path="users/accountants/:id" element={<AccountantDetails />} />
        <Route path="users/accountants/add" element={<AddAccountant />} />
        <Route path="users/:id" element={<UserProfile />} />

        <Route path="/notification/sms/" element={<Assignment />} />
      </Routes>
    </div>
  );
};

export default BaseRouter;
