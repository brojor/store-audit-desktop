import axiosInstance from './Api';

const qs = require('qs');

export function getAudits(dateRange, storeId) {
  const queryString = qs.stringify({
    start: dateRange.start.toJSDate(),
    end: dateRange.end.toJSDate(),
  });
  return axiosInstance.get(`/audits/${storeId}?${queryString}`);
}
export function getStores() {
  return axiosInstance.get('/stores');
}
export function getSummaryIndividualy(dateRange) {
  const queryString = qs.stringify(dateRange);
  return axiosInstance.get(`/summary/individualy?${queryString}`);
}
export function toggleResult(auditId, categoryPointId) {
  return axiosInstance.post(`/audits/${auditId}`, { categoryPointId });
}
