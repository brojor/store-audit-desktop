import Vue from 'vue';
import Vuex from 'vuex';

import RangeMaker from '../utils/RangeMaker';
import Api from '../services/Api';

const rangeMaker = new RangeMaker();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dateRange: rangeMaker.getRange(),
    audits: [],
  },
  mutations: {
    SET_AUDITS_DATA(state, data) {
      state.audits = data;
    },
    SET_DATE_RANGE(state, dateRange) {
      state.dateRange = dateRange;
    },
  },
  actions: {
    getAudits({ commit, state }) {
      Api.getAudits(state.dateRange)
        .then(({ data }) => {
          commit('SET_AUDITS_DATA', data);
        })
        .catch((err) => console.log(err));
    },
    nextDateRange({ commit, dispatch }) {
      const dateRange = rangeMaker.getNext();
      commit('SET_DATE_RANGE', dateRange);
      dispatch('getAudits');
    },
    prevDateRange({ commit, dispatch }) {
      const dateRange = rangeMaker.getPrev();
      commit('SET_DATE_RANGE', dateRange);
      dispatch('getAudits');
    },
  },
  getters: {
    halfYearAvaragePerc(state) {
      const validValues = state.audits.reduce((acc, audit) => {
        if (audit.totalPerc > 0) {
          acc.push(audit.totalPerc);
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
        if (audit.categories[catIndex].totalPerc > 0) {
          acc.push(audit.categories[catIndex].totalPerc);
        }
        return acc;
      }, []);

      if (validValues.length) {
        const average = validValues.reduce((a, b) => a + b, 0) / validValues.length;
        return average;
      }
      return -1;
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
  modules: {},
});
