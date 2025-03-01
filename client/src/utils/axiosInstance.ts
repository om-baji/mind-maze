import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_HONO_URL,
    timeout: 20000,
    withCredentials: true
})