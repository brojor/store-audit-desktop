<template>
  <div id="app">
    <DesktopView />
  </div>
</template>

<script>
import DesktopView from './components/DesktopView.vue';

export default {
  name: 'App',
  components: {
    DesktopView,
  },
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
