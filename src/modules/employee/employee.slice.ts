import { createSlice } from '@reduxjs/toolkit';
import client from '../../api/client';

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: null,
    loading: false,
    error: null
  },
  reducers: {
    fetchEmployeesRequest: (state, action) => {
      state.loading = true;
    },
    fetchEmployeesSuccess: (state, action) => {
      state.employees = action.payload;
      state.loading = false;
    },
    fetchEmployeesFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const { fetchEmployeesRequest, fetchEmployeesSuccess, fetchEmployeesFailed } = employeeSlice.actions

export const fetchEmployees = () => async (dispatch: any) => {
  dispatch(fetchEmployeesRequest(null));
  try {
    const response = await client.get('/employee');
    dispatch(fetchEmployeesSuccess(response));
  } catch (err) {
    dispatch(fetchEmployeesFailed(err.message));
  }
};


export default employeeSlice.reducer

