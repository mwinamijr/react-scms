import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import teacherReducer from "./features/user/teacherSlice";
import accountantReducer from "./features/user/accountantSlice";
import financeReducer from "./features/finance/financeSlice";
import studentReducer from "./features/students/studentSlice";
import parentReducer from "./features/user/parentSlice";
import subjectReducer from "./features/academic/subjectSlice";
import departmentReducer from "./features/academic/departmentSlice";

const store = configureStore({
  reducer: {
    getUsers: userReducer,
    getTeachers: teacherReducer,
    getAccountants: accountantReducer,
    finance: financeReducer,
    getStudents: studentReducer,
    getParents: parentReducer,
    getSubjects: subjectReducer,
    getDepartments: departmentReducer,
  },
});

export default store;
