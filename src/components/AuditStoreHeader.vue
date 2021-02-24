<template>
  <div class="header">
    <img class="logo" src="@/assets/Rock_Point_logo.jpg" alt="" />
    <h1>
      <span>R</span>OCK <span>P</span>OINT- <span>S</span>TORE
      <span>A</span>UDIT
    </h1>
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
img {
  width: 4.5rem;
  height: 4.5rem;
}
div.header {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  width: 100vw;
  background: white;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.64);
  border-bottom: 1px solid black;
}
.header h1 {
  margin-left: 2rem;
  margin-top: 2px;
  font-family: 'Orbitron', sans-serif;
  font-size: 2.9rem;
  letter-spacing: 2px;
}
.header h1 span {
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
}
</style>
