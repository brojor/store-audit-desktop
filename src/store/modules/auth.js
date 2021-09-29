/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

const state = {
  token: localStorage.getItem('token') || '',
  userFullName: localStorage.getItem('userFullName') || '',
};
const getters = {
  isAuthenticated: (state) => {
    if (state.token) {
      return true;
    }
    return false;
  },
};
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  SET_USER_FULLNAME(state, fullName) {
    state.userFullName = fullName;
    localStorage.setItem('userFullName', fullName);
  },
};
const actions = {
  login({ commit, dispatch }, credentials) {
    return AuthService.login(credentials).then(({ data }) => {
      commit('SET_TOKEN', data.token);
      commit('SET_USER_FULLNAME', data.fullName);
      return dispatch('getStores');
    });
  },
  logout({ commit }) {
    commit('SET_TOKEN', '');
    localStorage.clear();
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
