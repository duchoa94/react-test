

import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './modules/employee/employee.slice';

export default configureStore({
  reducer: {
    employee: employeeReducer,
  },
})