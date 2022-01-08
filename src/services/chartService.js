import axiosInstance from './Api';

const qs = require('qs');

export function categoryPointsDeficiencies(dateRange, detail, sort) {
  // const after = dateRange.start;
  // const before = dateRange.stop;
  const { start: after, stop: before } = dateRange;
  // const sort = 'deficiencies';
  const queryString = qs.stringify({
    after,
    before,
    detail,
    sort,
  });
  console.log(queryString);
  return axiosInstance.get(`http://localhost:5000/summary?${queryString}`);
}

export function getStoresFilterOptions() {
  console.log('volám store filter endpoint');
  return axiosInstance.get('/chart/store-filter-options');
}
