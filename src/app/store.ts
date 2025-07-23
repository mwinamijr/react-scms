import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import teacherReducer from "../features/user/teacherSlice";
import accountantReducer from "../features/user/accountantSlice";
import receiptReducer from "../features/finance/receiptSlice";
import paymentReducer from "../features/finance/paymentSlice";
import studentReducer from "../features/students/studentSlice";
import parentReducer from "../features/user/parentSlice";
import subjectReducer from "../features/academic/subjectSlice";
import departmentReducer from "../features/academic/departmentSlice";
import classLevelReducer from "../features/academic/classLevelSlice";
import allocationReducer from "../features/finance/allocationSlice";
import schoolEventReducer from "../features/administration/schoolEventSlice";
import termAndAcademicYearReducer from "../features/administration/termAndAcademicYearSlice";
import debtRecordReducer from "../features/finance/debtRecordSlice";
import debtBulkActionsReducer from "../features/finance/debtBulkActionSlice";
import paymentRecordReducer from "../features/finance/paymentRecordSlice";

export const store = configureStore({
  reducer: {
    getUsers: userReducer,
    getTeachers: teacherReducer,
    getAccountants: accountantReducer,
    getReceipts: receiptReducer,
    getPayments: paymentReducer,
    getAllocations: allocationReducer,
    getStudents: studentReducer,
    getParents: parentReducer,
    getSubjects: subjectReducer,
    getDepartments: departmentReducer,
    getClassLevels: classLevelReducer,
    getSchoolEvents: schoolEventReducer,
    getTermsAndAcademicYears: termAndAcademicYearReducer,
    getDebtRecords: debtRecordReducer,
    getDebtBulkActions: debtBulkActionsReducer,
    getPaymentRecords: paymentRecordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
