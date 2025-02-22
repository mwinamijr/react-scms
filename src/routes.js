import { createHashRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import { useEffect } from "react";

import MinimalLayout from "./screens/MinimalLayout";
import MainLayout from "./screens/MainLayout";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Developers from "./screens/gettingStarted/Developers";
import Teachers from "./screens/gettingStarted/Teachers";
import Parents from "./screens/gettingStarted/Parents";
import UserList from "./screens/users/UserList";
import AddAccountant from "./screens/users/AddAccountant";
import TeacherList from "./screens/users/TeacherList";
import TeacherDetails from "./screens/users/TeacherDetails";
import AddTeacher from "./screens/users/AddTeacher";
import TeacherBulkUpload from "./screens/users/TeacherBulkUpload";
import EditTeacherProfile from "./screens/users/TeacherUpdateProfile";
import PrintTeacherProfile from "./screens/users/PrintTeacherProfile";
import AccountantList from "./screens/users/AccountantList";
import AccountantDetails from "./screens/users/AccountantDetails";
import AccountantUpdate from "./screens/users/AccountantUpdate";
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
import StudentUpdate from "./screens/students/StudentUpdate";
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
import ClassLevelList from "./screens/academic/classLevel/ClassLevelList";
import ClassLevelDetails from "./screens/academic/classLevel/ClassLevelDetails";
import AddClassLevel from "./screens/academic/classLevel/AddClassLevel";
import UpdateClassLevel from "./screens/academic/classLevel/UpdateClassLevel";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.getUsers);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  return element;
};

const MainRoutes = {
  path: "/",
  element: <ProtectedRoute element={<MainLayout />} />,
  children: [
    { path: "/", element: <Dashboard /> },
    {
      path: "dashboard",
      children: [{ path: "", element: <Dashboard /> }],
    },
    {
      path: "academic",
      children: [
        { path: "departments", element: <DepartmentList /> },
        { path: "departments/:id", element: <DepartmentDetails /> },
        { path: "departments/add", element: <AddDepartment /> },
        { path: "departments/:id/edit", element: <UpdateDepartment /> },
        { path: "classLevels", element: <ClassLevelList /> },
        { path: "classLevels/:id", element: <ClassLevelDetails /> },
        { path: "classLevels/add", element: <AddClassLevel /> },
        { path: "classLevels/:id/edit", element: <UpdateClassLevel /> },
        { path: "subjects", element: <SubjectList /> },
        { path: "subjects/:id", element: <SubjectDetails /> },
        { path: "subjects/add", element: <AddSubject /> },
        { path: "subjects/upload", element: <SubjectBulkUpload /> },
        { path: "subjects/:id/edit", element: <UpdateSubject /> },
      ],
    },
    {
      path: "finance",
      children: [
        { path: "receipts/", element: <Receipts /> },
        { path: "receipts/:id", element: <ReceiptsDetails /> },
        { path: "receipts/add/", element: <AddReceipt /> },
        { path: "payments/", element: <Payments /> },
        { path: "payments/:id", element: <PaymentDetails /> },
        { path: "payments/add/", element: <AddPayment /> },
        { path: "payroll/", element: <Payroll /> },
        { path: "reports/", element: <Reports /> },
      ],
    },
    {
      path: "sis",
      children: [
        { path: "students/", element: <StudentList /> },
        { path: "students/:id", element: <StudentDetailsScreen /> },
        { path: "students/add", element: <AddStudent /> },
        { path: "students/upload", element: <BulkUpload /> },
        { path: "students/:id/edit", element: <StudentUpdate /> },
      ],
    },
    {
      path: "users",
      children: [
        { path: "", element: <UserList /> },
        { path: ":id", element: <UserProfile /> },
        { path: "parents", element: <ParentList /> },
        { path: "parents/:id", element: <ParentDetails /> },
        { path: "teachers", element: <TeacherList /> },
        { path: "teachers/add", element: <AddTeacher /> },
        { path: "teachers/upload", element: <TeacherBulkUpload /> },
        { path: "teachers/:id", element: <TeacherDetails /> },
        { path: "teachers/:id/edit", element: <EditTeacherProfile /> },
        { path: "teachers/:id/print", element: <PrintTeacherProfile /> },
        { path: "accountants/", element: <AccountantList /> },
        { path: "accountants/:id", element: <AccountantDetails /> },
        { path: "accountants/add", element: <AddAccountant /> },
        { path: "accountants/:id/edit", element: <AccountantUpdate /> },
      ],
    },
    {
      path: "notification/sms",
      children: [{ path: "", element: <Assignment /> }],
    },
  ],
};

// Authentication Routes
const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    { path: "login", element: <Login /> },

    { path: "/", element: <Home /> },
    { path: "/getting-started/developers/", element: <Developers /> },
    { path: "/getting-started/teachers/", element: <Teachers /> },
    { path: "/getting-started/parents/", element: <Parents /> },
  ],
};

// Combine Routes
const router = createHashRouter([MainRoutes, AuthenticationRoutes], {
  basename: "/",
});

export default router;
