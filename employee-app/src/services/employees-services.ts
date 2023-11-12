import { toast } from 'sonner';
import { configs } from "@/configs/app.config";
import axiosPublic from "@/provider/axiosPublic";
import { employeesUrls } from '@/utils/apiUrlsUtils';
import { buildApiUrl, InvalidInputError } from '@/utils/apiUtils';
import { Employee } from '@/types/employee-types';

export type ApiResponse = {
    success: boolean,
    message: string,
    data: any;
}

const EmpApi = {
    async getEmployees() {
        try {
            const response = await axiosPublic.get(buildApiUrl(`${configs?.baseApiVersion1}`, `${employeesUrls?.employeesURL}`));
            if (response.status === 200) {
                return { success: true, data: response?.data };
            }

            throw new InvalidInputError('some thing went wrong');
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : 'some thing went wrong';
            toast.error(errorMsg);
            return { success: false, error: error?.response?.data?.message };
        }
    },
    async addEmployee(submitData: Employee) {
        try {
            const response = await axiosPublic.post(buildApiUrl(`${configs?.baseApiVersion1}`, `${employeesUrls?.employeesURL}`), submitData);
            if (response.status === 201) {
                toast.success('added successfuly');
                return { success: true, data: response?.data };
            }

            throw new InvalidInputError('some thing went wrong');
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : 'some thing went wrong';
            toast.error(errorMsg);
            return { success: false, error: error?.response?.data?.message };
        }
    },

    async updateEmployee(submitData: Employee, id: string | undefined) {
        try {
            const response = await axiosPublic.put(buildApiUrl(`${configs?.baseApiVersion1}`, `${employeesUrls?.employeesURL}/${id}`), submitData);
            if (response.status === 200) {
                return { success: true, data: response?.data };
            }

            throw new InvalidInputError('some thing went wrong');
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : 'some thing went wrong';
            toast.error(errorMsg);
            return { success: false, error: error?.response?.data?.message };
        }
    },

    async deleteEmployee(id: string) {
        try {
            const response = await axiosPublic.delete(buildApiUrl(`${configs?.baseApiVersion1}`, `${employeesUrls?.employeesURL}/${id}`));
            if (response.status === 204) {
                return { success: true, data: response?.data };
            }

            throw new InvalidInputError('some thing went wrong');
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : 'some thing went wrong';
            toast.error(errorMsg);
            return { success: false, error: error?.response?.data?.message };
        }
    },

    async getOneEmployee(id: string) {
        try {
            const response = await axiosPublic.get(buildApiUrl(`${configs?.baseApiVersion1}`, `${employeesUrls?.employeesURL}/${id}`));
            if (response.status === 200) {
                return { success: true, data: response?.data };
            }

            throw new InvalidInputError('some thing went wrong');
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : 'some thing went wrong';
            toast.error(errorMsg);
            return { success: false, error: error?.response?.data?.message };
        }
    },

};

export default EmpApi;