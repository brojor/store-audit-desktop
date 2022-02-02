import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import audits from './audits.json';
import stores from './stores.json';
import { getAudits } from '../../../src/services/AuditsService';

const localVue = createLocalVue();
localVue.use(Vuex);

export { localVue };

export default new Vuex.Store({
  state: {
    audits,
    selectedStoreId: 'R4221',
    stores,
    loading: false,
    dateRange: {
      start: new Date('Wed Sep 01 2021 02:00:00 GMT+0200'),
      stop: new Date('Tue Mar 01 2022 00:59:59 GMT+0100'),
    },
  },
  mutations: {
    SET_SELECTED_STORE(state, selectedStoreId) {
      state.selectedStoreId = selectedStoreId;
    },
    SET_DATE_RANGE(state, dateRange) {
      state.dateRange = dateRange;
    },
  },
  actions: {
    getAudits({ state }) {
      console.log('jakoby volám /audits');
      return getAudits(state.dateRange, state.selectedStoreId);
    },
  },
  getters: {
    halfYearAvaragePerc(state) {
      const validValues = state.audits.reduce((acc, audit) => {
        if (audit.totalScore.perc > 0) {
          acc.push(audit.totalScore.perc);
        }
        return acc;
      }, []);

      if (validValues.length) {
        const average = validValues.reduce((a, b) => a + b, 0) / validValues.length;
        return average;
      }
      return -1;
    },
    averagePerc: (state) => (catIndex) => {
      const validValues = state.audits.reduce((acc, audit) => {
        if (audit.categories[catIndex].score.perc >= 0) {
          acc.push(audit.categories[catIndex].score.perc);
        }
        return acc;
      }, []);

      if (validValues.length) {
        const average = validValues.reduce((a, b) => a + b, 0) / validValues.length;
        return average;
      }
      return -1;
    },
    formatDate() {
      return (date) => {
        const dateObj = new Date(date);
        const [, month, year] = dateObj.toLocaleDateString().split('. ');
        return `${month.padStart(2, '0')}/${year}`;
      };
    },
  },
});
