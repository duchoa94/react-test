import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from './employee.slice';
import './index.scss';
import Pagination from './components/pagination/index';

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

  const headers = ['Name', 'Email', 'Position'];
  const [displayEmployees, setDisplayEmployees] = useState<Employee[]>();

  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    pageSize: 5,
    totalItems: 0
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (totalEmployees && totalEmployees.length) {
      setPagination(prevState => ({
        ...prevState,
        totalItems: totalEmployees.length
      }));

      const start = (pagination.currentPage - 1) * pagination.pageSize;
      const displayEmployees = totalEmployees.slice(start, start + pagination.pageSize);
      setDisplayEmployees(displayEmployees);
    }
  }, [totalEmployees]);

  const onPageChange = (pageNumber: number) => {
    setPagination(prevState => ({
      ...prevState,
      currentPage: pageNumber
    }));

    const start = (pageNumber - 1) * pagination.pageSize;
    const displayEmployees = totalEmployees.slice(start, start + pagination.pageSize);
    setDisplayEmployees(displayEmployees);
  }

  return (
    <div className="employee-page">
      <p>Employee List</p>

      <div className="content">
        <table>
          <thead>
            <tr>
              {headers.map((item, index) => <th key={index}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {isLoading ?  <tr><td colSpan={headers.length}>Loading...</td></tr> : null}
            {displayEmployees ? displayEmployees.map((employee: any) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
              </tr>
            )) : null}
          </tbody>
        </table>

        <Pagination currentPage={pagination.currentPage} pageSize={pagination.pageSize} pageNeighbours={2}
          totalItems={pagination.totalItems} onPageChange={(pageNumber) => onPageChange(pageNumber)} />
      </div>
    </div>
  )
}

export default EmployeePage;
