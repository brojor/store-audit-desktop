import axiosInstance from './Api';

const qs = require('qs');

export function getAudits(dateRange, storeId) {
  const queryString = qs.stringify(dateRange);
  return axiosInstance.get(`/audits/${storeId}?${queryString}`);
}
export function getStores() {
  return axiosInstance.get('/stores');
}
export function getSummaryIndividualy(dateRange) {
  const queryString = qs.stringify(dateRange);
  return axiosInstance.get(`/summary/individualy?${queryString}`);
}
