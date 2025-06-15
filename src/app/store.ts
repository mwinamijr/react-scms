import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import teacherReducer from "../features/user/teacherSlice";
import accountantReducer from "../features/user/accountantSlice";
import financeReducer from "../features/finance/financeSlice";
import studentReducer from "../features/students/studentSlice";
import parentReducer from "../features/user/parentSlice";
import subjectReducer from "../features/academic/subjectSlice";
import departmentReducer from "../features/academic/departmentSlice";
import classLevelReducer from "../features/academic/classLevelSlice";
import allocationReducer from "../features/finance/allocationSlice";
import schoolEventReducer from "../features/administration/schoolEventSlice";

export const store = configureStore({
  reducer: {
    getUsers: userReducer,
    getTeachers: teacherReducer,
    getAccountants: accountantReducer,
    getFinance: financeReducer,
    getAllocations: allocationReducer,
    getStudents: studentReducer,
    getParents: parentReducer,
    getSubjects: subjectReducer,
    getDepartments: departmentReducer,
    getClassLevels: classLevelReducer,
    getSchoolEvents: schoolEventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
