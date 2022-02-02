<template>
  <div class="main">
    <button @click="prev" data-test="get-prev"><arrow-left /></button>
    <div class="date-range-wrapper">
      <spinner v-if="loading" />
      <h1 data-test="dateRange" v-else>{{ formatedString }}</h1>
    </div>
    <button @click="next"><arrow-right /></button>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';
import ArrowLeft from './icons/arrowLeft.vue';
import ArrowRight from './icons/arrowRight.vue';

export default {
  components: { Spinner, ArrowLeft, ArrowRight },
  name: 'DateSelector',
  props: ['dateRange'],
  methods: {
    addMonths(date, months) {
      const d = date.getUTCDate();
      date.setUTCMonth(date.getUTCMonth() + +months);
      if (date.getUTCDate() !== d) {
        date.setUTCDate(0);
      }
      return new Date(date);
    },
    next() {
      const start = this.addMonths(this.dateRange.start, 6);
      const stop = this.addMonths(this.dateRange.stop, 6);

      this.$emit('change', { start, stop });
    },
    prev() {
      const start = this.addMonths(this.dateRange.start, -6);
      const stop = this.addMonths(this.dateRange.stop, -6);

      this.$emit('change', { start, stop });
    },
    formatDate(date) {
      const dateObj = new Date(date);
      const [year, month] = dateObj
        .toISOString()
        .slice(0, 10)
        .split('-');
      return `${month}/${year}`;
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    formatedString() {
      return `${this.formatDate(this.dateRange.start)} - ${this.formatDate(this.dateRange.stop)}`;
    },
  },
};
</script>

<style lang="css" scoped>
.main {
  display: flex;
  justify-content: center !important;
}

.date-range-wrapper {
  width: 60%;
  height: 3rem;
  background: white;
  padding: 0 1rem;
  border-radius: 4px;
  margin: auto 2rem;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 2px;
  color: black;
}

button {
  outline: none;
  border: none;
  background: inherit;
  border-radius: 50%;
  line-height: 0;
  padding: 0.1rem;
}
button:hover {
  background: var(--bg-semidark);
}
button:active {
  background: var(--bg-semidark);
  box-shadow: inset 0px 0px 7px 1px rgba(255, 255, 255, 0.5);
}
</style>
