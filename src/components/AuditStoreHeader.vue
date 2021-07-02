<template>
  <div class="header">
    <img class="logo" src="@/assets/logo-small.png" alt="logo" />
    <h1>STORE AUDIT</h1>
  </div>
</template>

<script>
export default {
  name: 'AuditStoreHeader',

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Sarpanch:wght@700&display=swap');

img {
  height: 3rem;
  margin-top: 4px;
}
div.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 100vw;
  background: #292929;
  /* background: #002927; */
  margin-bottom: 2rem;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.64);
  border-bottom: 1px solid black;
  color: #fff;
}
.header h1 {
  margin-left: 0.75rem;
  margin-top: 2px;
  font-family: 'Orbitron', sans-serif;
  font-family: 'Sarpanch', sans-serif;
  font-style: italic;
  font-size: 2.9rem;
  letter-spacing: 2px;
}
.header h1 span {
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
}
</style>
