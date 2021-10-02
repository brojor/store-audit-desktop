<template>
  <select name="store" id="storeSelect" v-model="selectedStoreId">
    <option v-for="store in stores" :key="store.id" :value="store.id">{{ store.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'StoreSelector',
  computed: {
    stores() {
      return this.$store.state.stores;
    },
    selectedStoreId: {
      get() {
        return this.$store.state.selectedStoreId;
      },
      set(newValue) {
        this.$store.commit('SET_SELECTED_STORE', newValue);
        // this.$store.dispatch('getAudits');
        this.$emit('change');
      },
    },
  },
};
</script>

<style scoped>
select {
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  outline: none;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  border: none;
  text-align: center;
}
</style>
