import axios from "axios"

export const axiosInstance = axios.create({
    url : import.meta.env.HONO_URL,
    timeout : 20000,
    withCredentials : true
})