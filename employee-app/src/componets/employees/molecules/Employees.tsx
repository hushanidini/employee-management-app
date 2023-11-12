"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FaList, FaTh } from 'react-icons/fa';
import {Grid, IconButton , Button} from '@mui/material';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import EmpApi from '@/services/employees-services';
import { allEmployees } from '@/redux/features/employeeSlice';
import ListEmployee from '@/componets/employees/molecules/ListEmployee';
import GridEmployees from '@/componets/employees/molecules/GridEmployees';

export default function Employees() {

  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<string>('list');
  const employeesRedux = useAppSelector(
    (state) => state.employeeReducer.employees
  );

  const employeeList = useMemo(() => employeesRedux, [employeesRedux]);

  const fetchEmployees = async () => {
    try {
      const response = await EmpApi.getEmployees();
      if (response?.success === true) {
        dispatch(allEmployees(response?.data));
      }
    } catch (error: any) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetchEmployees();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  /**
   * Toggle view mode
   */
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'grid' : 'list'));
  };

  return (
   <>
        <Grid container spacing={2} style={{marginTop: '10px'}}>
            <Grid item xs={6} md={8} />
            <Grid item xs={6} md={4}>
                <Link href={`/employee/add`}>
                    <Button variant="outlined" size="medium" >
                        ADD EMPLOYEE
                    </Button> 
                </Link>
                <IconButton style={{background: '#1976d2', color:'white', margin: '10px'}}  onClick={toggleViewMode}>
                    {viewMode === 'list' ? <FaList /> : <FaTh />}
                </IconButton >
                
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} >
                {viewMode === 'list' ? (
                <ListEmployee employees={employeeList} />
                ) : (
                <GridEmployees employees={employeeList} />
                )}
             </Grid>
        </Grid>
     
      </>
  );
}
