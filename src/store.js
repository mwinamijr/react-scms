import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import teacherReducer from "./features/user/teacherSlice";
import accountantReducer from "./features/user/accountantSlice";
import financeReducer from "./features/finance/financeSlice";
import studentReducer from "./features/students/studentSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    teacher: teacherReducer,
    accontant: accountantReducer,
    finance: financeReducer,
    student: studentReducer,
  },
});

export default store;
