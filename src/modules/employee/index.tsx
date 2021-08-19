import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from './employee.slice';

interface Employee {
  id: number,
  name: string,
  email: string,
  position: string,
}

const EmployeePage = () => {
  const [employee, setEmployees] = useState<Employee[]>();

  const dispatch = useDispatch();
  const employeeList = useSelector((state: any) =>  state.employee.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    console.log(employeeList);
  }, [employeeList]);

  return (
    <div>
      <p>Employee List</p>

      <div className="content">
        <ul>
          {employeeList ? employeeList.map((employee: any) => (
            <li key={employee.id}>{employee.name}</li>
          )): null}
        </ul>
      </div>
    </div>
  )
}

export default EmployeePage;
