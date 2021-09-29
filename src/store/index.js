import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';

import RangeMaker from '../utils/RangeMaker';
import { getStores, getAudits } from '../services/AuditsService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedStoreId: '',
    audits: [],
    stores: JSON.parse(localStorage.getItem('stores')) || [],
    loading: false,
  },
  mutations: {
    SET_AUDITS_DATA(state, data) {
      state.audits = data;
    },
    SET_DATE_RANGE(state, dateRange) {
      state.dateRange = dateRange;
    },
    SET_STORES(state, stores) {
      state.stores = stores;
      // eslint-disable-next-line prefer-destructuring
      state.selectedStoreId = stores[0].id;
      localStorage.setItem('stores', JSON.stringify(stores));
    },
    SET_SELECTED_STORE(state, selectedStoreId) {
      state.selectedStoreId = selectedStoreId;
    },
    SET_LOADING_STATE(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    getStores({ commit, dispatch }) {
      getStores()
        .then(({ data }) => {
          const currentRange = new RangeMaker().getRange();
          console.log('get stores action: ', { data });
          commit('SET_STORES', data.stores);
          dispatch('getAudits', currentRange);
        })
        .catch((err) => console.log(err));
    },
    getAudits({ commit, state }, dateRange) {
      commit('SET_LOADING_STATE', true);
      getAudits(dateRange, state.selectedStoreId)
        .then(({ data }) => {
          commit('SET_AUDITS_DATA', data);
          commit('SET_LOADING_STATE', false);
        })
        .catch((err) => console.log(err));
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
        if (audit.categories[catIndex].totalPerc >= 0) {
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
  modules: {
    auth,
  },
});
