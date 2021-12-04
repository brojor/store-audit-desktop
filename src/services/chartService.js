import axiosInstance from './Api';

const qs = require('qs');

export default function categoryPointsDeficiencies(dateRange) {
  const queryString = qs.stringify(dateRange);
  return axiosInstance.get(`http://localhost:5000/summary?${queryString}`);
}
