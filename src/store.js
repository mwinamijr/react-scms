import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import teacherReducer from "./features/user/teacherSlice";
import accountantReducer from "./features/user/accountantSlice";
import financeReducer from "./features/finance/financeSlice";
import studentReducer from "./features/students/studentSlice";
import parentReducer from "./features/user/parentSlice";

const store = configureStore({
  reducer: {
    getUsers: userReducer,
    teacher: teacherReducer,
    accontant: accountantReducer,
    finance: financeReducer,
    getStudents: studentReducer,
    getParents: parentReducer,
  },
});

export default store;
