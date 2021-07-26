/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

const state = {
  token: localStorage.getItem('token') || null,
};
const getters = {
  userIsLogged: (state) => {
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
};
const actions = {
  login({ commit, dispatch }, credentials) {
    return AuthService.login(credentials)
      .then(({ data }) => {
        console.log('actions-token', data.token);
        commit('SET_TOKEN', data.token);
        console.log('dispTCHUJU V vuex/auth');
        dispatch('getStores');
      })
      .catch((err) => {
        console.log(err);
        // console.log(err.response.data);
      });
  },
  logout({ commit }) {
    commit('SET_TOKEN', null);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
