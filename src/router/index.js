import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import store from '../store';
import Chart from '../views/Chart.vue';

Vue.use(VueRouter);

const onlyAuthenticated = (to, from, next) => {
  const { isAuthenticated } = store.getters;
  if (!isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: onlyAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart,
    beforeEnter: onlyAuthenticated,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
