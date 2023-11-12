import { createSlice } from "@reduxjs/toolkit";
import { Employee } from '@/types/employee-types';

type EmployeeState = {
    employee: Employee;
    employees: any;
};

const initialState = {
    employees: [],
    employee: {},
} as EmployeeState;

export const employeeSlice = createSlice({
    name: "emp",
    initialState,
    reducers: {
        addEmploye: (state, action) => {
            state.employee = action.payload;
        },
        allEmployees: (state, action) => {
            state.employees = action.payload;
        },
        setEditEmployee: (state, action) => {
            state.employee = action.payload;
        },

    },
});

export const { addEmploye, allEmployees, setEditEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
