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
        this.$store.dispatch('getAudits');
      },
    },
  },
};
</script>

<style scoped>
select {
  width: 250px;
  height: 3rem;
  border-radius: 4px;
  margin-right: 2rem;
  border: 1px solid #444;
  outline: none;
}
</style>
