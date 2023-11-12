import axios from "axios";
import { configs } from "@/configs/app.config";

const axiosPublic = axios.create({
    baseURL: `${configs.baseApiUrl}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosPublic;
