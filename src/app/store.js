// Main Storage for GLOBAL STATE

import { configureStore } from "@reduxjs/toolkit"

import counterSlice from "../features/counter/counterSlice"
import employeeSlice from "../features/employee/employeeSlice"
import studentSlice from "../features/student/studentSlice"

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    student: studentSlice,
    employee: employeeSlice,
  },
})
