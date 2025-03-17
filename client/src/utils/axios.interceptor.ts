import axios from "axios";

const axiosIntercept = axios.create({
  baseURL: `${import.meta.env.VITE_HONO_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosIntercept.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosIntercept.get("/refresh");
        return axiosIntercept(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosIntercept };
