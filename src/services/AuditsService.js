import axiosInstance from './Api';

const qs = require('qs');

export default {
  getAudits(dateRange, storeId) {
    const queryString = qs.stringify(dateRange);
    console.log({ queryString });
    console.log({ storeId });

    return axiosInstance.get(`/audits/${storeId}?${queryString}`);
  },
  getStores() {
    return axiosInstance.get('/stores');
  },
};
