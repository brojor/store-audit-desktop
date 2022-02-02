<template>
  <select name="selector" id="selector" v-model="selectedItemId" @change="handleChange">
    <!-- eslint-disable-next-line max-len -->
    <option v-for="option in options" :key="option.id" :value="option.id">{{ option.title }}</option>
  </select>
</template>

<script>
export default {
  name: 'UniversalSelector',
  props: ['options'],
  data() {
    return {
      selectedItemId: this.options.length ? this.options[0].id : '',
    };
  },
  methods: {
    handleChange() {
      const selectedObj = this.options.find((item) => item.id === this.selectedItemId);
      this.$emit('change', selectedObj);
    },
  },
  watch: {
    options() {
      this.selectedItemId = this.options[0].id;
    },
  },
};
</script>

<style scoped>
select {
  flex-grow: 1;
  height: 3rem;
  border-radius: 4px;
  margin: 0.5rem 0;
  padding: 0.5rem;

  outline: none;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  border: none;
  text-align: center;
}
</style>
