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
:root {
  --bg-light: #fde6d8;
  --bg-mid: #fcdcc5;
  --bg-semidark: #d0d2dc;
  --bg-dark: #5c80bc;
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
</style>
