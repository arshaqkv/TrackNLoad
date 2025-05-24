import axios from "axios";
import { config } from "../../config/config";
import { clearPersistData } from "../../utils/clearPersistData";

const BASE_URL = config.app.PORT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        clearPersistData("persist:auth"); 
        window.location.href = "/login"; 
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
