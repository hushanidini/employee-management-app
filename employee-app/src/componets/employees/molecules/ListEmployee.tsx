import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { Employee } from '@/types/employee-types';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { setEditEmployee } from '@/redux/features/employeeSlice';
import EmpApi from '@/services/employees-services';
import { allEmployees } from '@/redux/features/employeeSlice';
import ConfirmationModel from '@/componets/employees/models/confirmationModel';

type ListEmployeeProps = {
  employees: Employee[];
};

const ListEmployee = ({ employees }: ListEmployeeProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState<string | null>(null);

  const handleEditPage = (selectedData: Employee) => {
    if (selectedData) {
      dispatch(setEditEmployee(selectedData));
      router.push(`/employee/edit/${selectedData?._id}`);
      if (selectedData?._id) {
        localStorage.setItem('empId', selectedData?._id);
      }
    }
  };

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
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4"></th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((emp: Employee) => {
            const gender = emp?.gender === 'M' ? 'Male' : emp?.gender === 'F' ? 'Female' : null;
            return (
              <tr
                key={`${emp._id}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="flex items-center px-6 py-4">
                  <img className="w-10 h-10 rounded-full" src={emp?.photo} alt="picture" />
                </td>
                <td className="px-6 py-3">{emp?.first_name}</td>
                <td className="px-6 py-3">{emp?.last_name}</td>
                <td className="px-6 py-3">{emp?.email}</td>
                <td className="px-6 py-3">{emp?.number}</td>
                <td className="px-6 py-3">{gender}</td>
                <td className="px-6 py-4">
                  <Button size="small" onClick={() => handleEditPage(emp)}>
                    Edit
                  </Button>
                  <IconButton size="small" color="error" onClick={() => handleDelete(emp?._id)}>
                    <FaTrash />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <ConfirmationModel
        handleCloseModal={handleCloseModal}
        confirmDelete={confirmDelete}
        deleteEmployeeId={deleteEmployeeId}
        headerText={`Confirm Delete`}
        desText={`Are you sure you want to delete this employee?`}
      />
      {/* <Modal open={!!deleteEmployeeId} onClose={handleCloseModal}>
        <Paper style={{ padding: '16px', maxWidth: '300px', margin: 'auto', marginTop: '20vh' }}>
          <Typography variant="h6" gutterBottom>
            Confirm Delete
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Are you sure you want to delete this employee?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={confirmDelete} color="error">
              Delete
            </Button>
          </div>
        </Paper>
      </Modal> */}
    </>
  );
};

export default ListEmployee;
