import axiosInstance from './Api';

const qs = require('qs');

export default function categoryPointsDeficiencies(dateRange, detail) {
  const after = dateRange.start;
  const before = dateRange.stop;
  const queryString = qs.stringify({ after, before, detail });
  return axiosInstance.get(`http://localhost:5000/summary?${queryString}`);
}
