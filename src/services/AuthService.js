import axiosInstance from './Api';

export default {
  login(credentials) {
    return axiosInstance.post('/auth/login', credentials);
  },
};
