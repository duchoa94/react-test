import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, addNewEmployee } from './employee.slice';
import './index.scss';
import Pagination from './components/pagination/index';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Employee {
  id: number,
  name: string,
  email: string,
  position: string,
}

interface PaginationData {
  currentPage: number,
  pageSize: number,
  totalItems: number,
}

const EmployeePage = () => {
  const dispatch = useDispatch();
  const totalEmployees: Employee[] = useSelector((state: any) => state.employee.employees);
  const isLoading = useSelector((state: any) => state.employee.loading);

  const [displayEmployees, setDisplayEmployees] = useState<Employee[]>();

  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    pageSize: 5,
    totalItems: 0
  });

  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    position: ""
  });
  const [isAddUser, setAddUser] = useState(false);
  const newEmployee: Employee = useSelector((state: any) => state.employee.newEmployee);
  const isAddingEmployee: boolean = useSelector((state: any) => state.employee.isAddingEmployee);
  const addEmployeeError: string = useSelector((state: any) => state.employee.addEmployeeError);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const fetchDisplayEmployees = useCallback(() => {
    if (totalEmployees && totalEmployees.length) {
      setPagination(prevState => ({
        ...prevState,
        totalItems: totalEmployees.length
      }));

      const start = (pagination.currentPage - 1) * pagination.pageSize;
      const displayEmployees = totalEmployees.slice(start, start + pagination.pageSize);
      setDisplayEmployees(displayEmployees);
    }
  }, [totalEmployees, pagination.currentPage, pagination.pageSize]);

  useEffect(() => {
    fetchDisplayEmployees();
  }, [fetchDisplayEmployees]);

  useEffect(() => {
    if (newEmployee) {
      setNewUserForm({ name: "", email: "", position: "" });
      toast.success("🦄 Add New Employee Successfully!", { autoClose: 2000 });
      dispatch(fetchEmployees());
    }
  }, [newEmployee, dispatch]);

  useEffect(() => {
    if (addEmployeeError) {
      toast.error("Add New Employee Failed. Please try again!", { autoClose: 2000 });
    }
  }, [addEmployeeError]);

  const onPageChange = (pageNumber: number) => {
    setPagination(prevState => ({
      ...prevState,
      currentPage: pageNumber
    }));

    const start = (pageNumber - 1) * pagination.pageSize;
    const displayEmployees = totalEmployees.slice(start, start + pagination.pageSize);
    setDisplayEmployees(displayEmployees);
  }

  const onClickAddUser = (event: any) => {
    setAddUser(true);
  }

  const onClickSaveUser = (event: any) => {
    event.preventDefault();
    dispatch(addNewEmployee(newUserForm));
  }

  const onClickCancelAddUser = () => {
    setAddUser(false);
  }

  const onInputChanged = (event: any) => {
    const { value, name } = event.target;
    setNewUserForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="employee-page">
      <div className="header">
        <h3>Employee List</h3>
        <button type="button" className="btn-add-user" onClick={onClickAddUser}>Add New User</button>
      </div>

      <div className="content">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              {isAddUser ? <th>Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {isAddUser ?
              <tr>
                <td>
                  <input className="input-user" type="text" placeholder="Input name" name="name"
                    value={newUserForm.name} onChange={onInputChanged}></input>
                </td>
                <td>
                  <input className="input-user" type="text" placeholder="Input email" name="email"
                    value={newUserForm.email} onChange={onInputChanged}></input>
                </td>
                <td>
                  <input className="input-user" type="text" placeholder="Input position" name="position"
                    value={newUserForm.position} onChange={onInputChanged}></input>
                </td>
                <td>
                  {isAddingEmployee ? <span>Saving...</span> : null}

                  {!isAddingEmployee ?
                    <button className="btn-save" type="button" onClick={onClickSaveUser}
                      disabled={!newUserForm.name || !newUserForm.email || !newUserForm.position}>Add</button>
                    : null}

                  {!isAddingEmployee ? <button className="btn-cancel" type="button" onClick={onClickCancelAddUser}>Cancel</button> : null}
                </td>
              </tr>
              : null}

            {displayEmployees ? displayEmployees.map((employee: any) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                {isAddUser ? <td></td> : null}
              </tr>
            )) : null}

            {isLoading ? <tr><td colSpan={4}>Loading...</td></tr> : null}

          </tbody>
        </table>

        <Pagination currentPage={pagination.currentPage} pageSize={pagination.pageSize} pageNeighbours={2}
          totalItems={pagination.totalItems} onPageChange={(pageNumber) => onPageChange(pageNumber)} />

        <ToastContainer />
      </div>
    </div>
  )
}

export default EmployeePage;
