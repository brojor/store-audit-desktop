<template>
  <div v-if="hiddeAll" class="secret">
    <form @submit.prevent="unhide">
      <input type="text" placeholder="Zadejte heslo" v-model="password" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'HideScreen',

  data() {
    return {
      hiddeAll: true,
      password: '',
    };
  },
  methods: {
    unhide() {
      if (this.password.toLowerCase() === 'únor') {
        this.hiddeAll = false;
      }
    },
  },
};
</script>

<style lang="css" scoped>
.secret {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(8px);
}
.secret input {
  margin-top: 33vh;
  height: 3rem;
  padding: 1rem;
  text-align: center;
}
</style>
