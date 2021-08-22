import { createSlice } from '@reduxjs/toolkit';
import client from '../../api/client';

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: null,
    loading: false,
    error: null,
    newEmployee: null,
    isAddingEmployee: false,
    addEmployeeError: null,
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
    addEmployeeRequest: (state, action) => {
      state.isAddingEmployee = true;
    },
    addEmployeeSuccess: (state, action) => {
      state.newEmployee = action.payload;
      state.isAddingEmployee = false;
    },
    addEmployeeError: (state, action) => {
      state.isAddingEmployee = false;
    }
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

export const { addEmployeeRequest, addEmployeeSuccess, addEmployeeError } = employeeSlice.actions

export const addNewEmployee = (data: any) => async (dispatch: any) => {
  dispatch(addEmployeeRequest(null))
  try {
    const response = await client.post('/employee', data);
    dispatch(addEmployeeSuccess(response));
  } catch (err) {
    dispatch(addEmployeeError(err.message));
  }
}


export default employeeSlice.reducer

