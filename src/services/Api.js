/* eslint-disable operator-linebreak */
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.VUE_APP_LOCAL_API_URL
    : process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
