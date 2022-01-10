import axiosInstance from './Api';

const qs = require('qs');

export function deficiencies(dateRange, { detailLevel, sortBy, storesFilter }) {
  const { id } = storesFilter;
  const path = storesFilter.type === 'group' ? `/chart/aggregated/${id}` : `/chart/individual/${id}`;
  const { start: after, stop: before } = dateRange;

  const queryString = qs.stringify({
    after,
    before,
    detailLevel,
    sortBy,
  });

  return axiosInstance.get(`${path}?${queryString}`);
}

export function getStoresFilterOptions() {
  return axiosInstance.get('/chart/store-filter-options');
}
