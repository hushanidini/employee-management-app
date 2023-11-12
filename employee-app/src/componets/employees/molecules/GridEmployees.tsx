import React, {useState} from 'react';
import {Grid, Card, CardContent, CardActions, CardMedia , Modal ,Paper, Typography, IconButton } from '@mui/material';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Employee } from '@/types/employee-types';
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import {setEditEmployee} from '@/redux/features/employeeSlice';
import EmpApi from '@/services/employees-services';
import { allEmployees } from '@/redux/features/employeeSlice';
import ConfirmationModel from '@/componets/employees/models/confirmationModel';

type GridEmployeesProps = {
  employees: Employee[];
};

const GridEmployees: React.FC<GridEmployeesProps> = ({ employees }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);

  const handleEditPage = (selectedData: Employee ) => {
    if(selectedData){
      dispatch(setEditEmployee(selectedData));
      router.push(`/employee/edit/${selectedData?._id}`);
     
    }
  }

  const handleDelete = async (id: string | undefined) => {
    setDeleteEmployeeId(id || null);
  };

  const confirmDelete = async () => {
    try {
      if (deleteEmployeeId) {
        const response = await EmpApi.deleteEmployee(deleteEmployeeId);
        if (response?.success === true) {
          handleCloseModal();
          alert('successfuly deleted') 
          fetchEmployees();
        }
      }
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setDeleteEmployeeId(null); 
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await EmpApi.getEmployees();
      if (response?.success === true) {
        dispatch(allEmployees(response?.data));
      }
      return response;
    } catch (error: any) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleCloseModal = () => {
    setDeleteEmployeeId(null);
  };
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {employees.map((emp) => {
        const gender = emp?.gender === 'M' ? 'Male' : emp?.gender === 'F' ? 'Female' : null;
        const { _id, first_name, last_name, email, number, photo } = emp;

        return (
          <Grid item xs={3} sm={3} md={3}  key={_id} >
            <Card sx={{ maxWidth: 250, maxHeight: 300}} style={{margin: '10px'}}>
              <CardMedia
                sx={{ height: 120 }}
                image={photo}
                title="picture"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                {`${first_name} ${last_name}`}
                </Typography>
                <p>{email}</p>
                <p>{number}</p>
                <p>{gender}</p>
              </CardContent>
              <CardActions>
                <IconButton size="small" color='success' onClick={() => handleEditPage(emp)}><FaEdit /></IconButton>
                <IconButton size="small" color='error' onClick={() => handleDelete(emp?._id)}><FaTrash /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}

      <ConfirmationModel
        handleCloseModal={handleCloseModal}
        confirmDelete={confirmDelete}
        deleteEmployeeId={deleteEmployeeId}
        headerText={`Confirm Delete`}
        desText={`Are you sure you want to delete this employee?`}
      />
      </Grid>
  );
};

export default GridEmployees;
