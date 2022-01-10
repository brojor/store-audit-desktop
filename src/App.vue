<template>
  <div id="app">
    <AuditStoreHeader />
    <router-view />
  </div>
</template>

<script>
import AuditStoreHeader from './components/AuditStoreHeader.vue';

export default {
  name: 'App',
  components: {
    AuditStoreHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --bg-light: #fde6d8;
  --bg-mid: #fcdcc5;
  --bg-semidark: #ff3333;
  --bg-dark: #f47920;
  --bg-main: #969696;
}

html {
  background: var(--bg-main);
  font-size: 62.5%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.router-link-active {
  color: inherit;
}
.router-link-exact-active {
  color: #e60001;
}
a {
  color: inherit;
}

.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.center-x-y {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* universal */
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
</style>
