import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

import { getStores, getAudits } from '../services/AuditsService';
import { getDateRange } from '../utils/DateRange';
import { countAvarage, formatDate } from '../utils/utils';

Vue.use(Vuex);

const storesInStorage = localStorage.getItem('stores');

export default new Vuex.Store({
  state: {
    stores: JSON.parse(localStorage.getItem('stores')) || [],
    selectedStoreId: storesInStorage ? JSON.parse(storesInStorage)[0].id : '',
    audits: [],
    loading: false,
    dateRange: getDateRange(),
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
    getStores({ commit }) {
      return getStores()
        .then(({ data }) => {
          commit('SET_STORES', data.stores);
          commit('SET_SELECTED_STORE', data.stores[0].id);
        })
        .catch((err) => console.log(err));
    },
    getAudits({ commit, state }) {
      commit('SET_LOADING_STATE', true);
      return getAudits(state.dateRange, state.selectedStoreId)
        .then(({ data }) => {
          commit('SET_AUDITS_DATA', data);
          commit('SET_LOADING_STATE', false);
        })
        .catch((err) => console.log(err));
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
    dateRange(state) {
      const { start, stop } = state.dateRange;
      return `${formatDate(start)} - ${formatDate(stop)}`;
    },
  },
  modules: {
    auth,
  },
});
