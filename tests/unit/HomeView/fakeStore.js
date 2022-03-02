import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import audits from './audits.json';
import stores from './stores.json';
import { getAudits } from '../../../src/services/AuditsService';

const localVue = createLocalVue();
localVue.use(Vuex);

export { localVue };

const countAvarage = (values) => values.reduce((a, b) => a + b, 0) / values.length;

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
      return getAudits(state.dateRange, state.selectedStoreId).catch(() => {
        console.log('FakeVUEX api call error');
      });
    },
  },
  getters: {
    avarageScorePerc: ({ audits }) => (catIndex) => {
      const values = catIndex !== undefined
        ? audits.map((audit) => audit.categories[catIndex].score.perc)
        : audits.map((audit) => audit.totalScore.perc);
      const validValues = values.filter((val) => val > 0);
      return validValues.length ? countAvarage(validValues) : -1;
    },
    dateRange(state, getters) {
      return `${getters.formatDate(state.dateRange.start)} - ${getters.formatDate(
        state.dateRange.stop,
      )}`;
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
