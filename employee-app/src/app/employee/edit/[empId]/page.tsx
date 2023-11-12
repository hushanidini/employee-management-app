"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import EmployeeFormHeader from '@/componets/employees/molecules/EmployeeFormHeader';
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
import EmpApi from '@/services/employees-services';
import { allEmployees, setEditEmployee } from '@/redux/features/employeeSlice';
import { Employee } from "@/types/employee-types";

const schema = yup.object().shape({
    first_name: yup.string().required('You must enter a first name').min(6).max(10),
    last_name: yup.string().required('You must enter a last name').min(6).max(10),
    email: yup.string().email().required('You must enter a email'),
    number: yup.string().matches(/^\+94[0-9]{9}$/).max(12).required('You must enter a phone'),
    gender: yup.string().oneOf(['M', 'F']).required('You must select a gender'),
  });

const EditEmployeePage =() =>{
    const router = useRouter();
    const editEmployeeRedux = useAppSelector(
        (state) => state.employeeReducer.employee
      );
    const empId = localStorage.getItem('empId');
    const defaultVal:Employee = {
        first_name: editEmployeeRedux?.first_name || '',
        last_name: editEmployeeRedux?.last_name || '',
        email: editEmployeeRedux?.email || '',
        number: editEmployeeRedux?.number || '',
        gender: editEmployeeRedux?.gender || ''
    }
    const dispatch = useAppDispatch();
    const methods = useForm({
		mode: 'onChange',
        defaultValues: defaultVal,
		resolver:yupResolver(schema)
        
	});
	const {
        control,
        handleSubmit,
		formState: { errors },
        setValue
	} = methods;

    useEffect(() => {
        const fetchEmployeeData = async () => {
          if (empId) {
            try {
              const response = await EmpApi.getOneEmployee(empId);
              if (response?.success === true) {
                dispatch(setEditEmployee(response?.data));
                setValue('first_name', response?.data?.first_name);
                setValue('last_name', response?.data?.last_name);
                setValue('email', response?.data?.email);
                setValue('number', response?.data?.number);
                setValue('gender', response?.data?.gender);
              }
            } catch (error) {
              console.error('Error fetching employee data:', error);
            }
          }
        };
        fetchEmployeeData();
      }, [setValue, empId, dispatch]);

    const onSubmit = async (data: any) => {
        try {
          const submitData = {
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            number: data?.number,
            gender: data?.gender,
          };
          if (empId) {
            const response = await EmpApi.updateEmployee(submitData, empId);
            if (response?.success === true) {
              alert('Successfully updated');
              fetchEmployees();
              localStorage.removeItem('empId');
              router.push('/');
            }
          } else {
            alert('Employee ID not found');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };

      

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

      const genderList = [{option: 'Male', value: "M"},{option: 'Female', value: "F"}]
    return(
        <>
            <EmployeeFormHeader />
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} style={{ padding: '20px' }}>
                
            <Grid item xs={4}>
            <Controller
					name="first_name"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-2 mb-2"
							required
							error={!!errors.first_name}
							helperText={errors?.first_name?.message}
							label="First name"
							id="first_name"
							variant="outlined"
							size="small"
							fullWidth
						/>
					)}
				/>
           <Controller
					name="last_name"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-2 mb-2"
							required
							error={!!errors.last_name}
							helperText={errors?.last_name?.message}
							label="Last name"
							id="last_name"
							variant="outlined"
							size="small"
							fullWidth
						/>
					)}
				/>
                <Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-2 mb-2"
                            type="email"
							required
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="email"
							id="email"
							variant="outlined"
							size="small"
							fullWidth
						/>
					)}
				/>
                 <Controller
					name="number"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-2 mb-2"
							required
							error={!!errors.number}
							helperText={errors?.number?.message}
							label="number"
							id="number"
							variant="outlined"
							size="small"
							fullWidth
						/>
					)}
				/>
                <FormControl
					fullWidth
					size="small"
					placeholder="Gender"
					required
				>
					<InputLabel>
                    Gender
					</InputLabel>
					<Controller
						control={control}
						name="gender"
						render={({ field }) => (
							<Select
								{...field}
								labelId="Gender"
								id="gender"
								label="Gender"
								className="mt-2 mb-2"
                                error={!!errors.gender}
								helperText={errors.gender?.message}
							>
								{genderList?.map(item => (
									<MenuItem
										key={item?.value}
										value={item?.value}
									>{`${item?.option}`}</MenuItem>
								))}
							</Select>
						)}
					/>
				</FormControl>

            </Grid>
            </Grid>
            <Button variant="outlined" size="medium" type="submit">SAVE</Button>
            </form>
        </>
    )
}
export default EditEmployeePage;