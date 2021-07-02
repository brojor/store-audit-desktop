import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       // window.location.reload();
//     }
//     return Promise.reject(error);
//   },
// );

function getAudits(dateRange) {
  return axiosInstance.post('/audits', { dateRange });
}

export default {
  getAudits,
};
