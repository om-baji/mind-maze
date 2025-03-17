import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_HONO_URL}/api/v1`,
    timeout: 20000,
    withCredentials: true,
    headers : {
        "Content-Type" : "application/json"
    }
})
