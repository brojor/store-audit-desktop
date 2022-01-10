<template>
  <div class="header">
    <div class="container">
      <div class="header-left">
        <div class="flex items-center">
          <img class="logo" src="@/assets/logo-small.png" alt="logo" @click="handleClickOnLogo" />
          <h1>STORE AUDIT</h1>
        </div>
      </div>
      <div class="header-right">
        <span class="header-user-name">{{ fullName }}</span>
        <LogOut class="logout-icon" @click.native="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import LogOut from '@/components/icons/logout.vue';

export default {
  name: 'AuditStoreHeader',
  components: { LogOut },
  computed: {
    fullName() {
      return this.$store.state.auth.userFullName;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
    handleClickOnLogo() {
      this.$router.push({ name: 'Chart' });
    },
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
  padding: 0.5rem 2rem;
  width: 100vw;
  background: #292929;
  /* background: #002927; */
  margin-bottom: 2rem;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.64);
  border-bottom: 1px solid black;
  color: #fff;
}
.container {
  margin: 0 auto;
  max-width: 1140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  /* margin-top: 2px; */
  margin-left: 0.5rem;
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
.logout-icon {
  fill: #e60001;
  width: 2.5rem;
  height: auto;
  cursor: pointer;
}
.logout-icon:hover {
  fill: #da5252;
}
.header-right {
  display: flex;
  align-items: center;
}
.header-user-name {
  font-size: 1.6rem;
  letter-spacing: 1.5px;
  margin-right: 2rem;
}
</style>
