<template>
  <div class="filter-category">
    <div class="filter-name">{{ name }}:</div>

    <div class="filter-option" v-for="(option, i) in options" :key="`option${i}`">
      <input type="radio" :id="`by-${option.id}`" :value="option.id" v-model="selected" />
      <label :for="`by-${option.id}`">{{ option.title }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'options'],
  data() {
    return {
      selected: this.options[0].id,
    };
  },
  watch: {
    selected() {
      this.$emit('change', this.selected);
    },
  },
};
</script>

<style scoped>
.filter-category {
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-name {
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-right: 1rem;
  font-weight: 800;
  /* padding: 0.5rem; */
}

.filter-option {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

label {
  margin: 0 0.25rem;
}
</style>
