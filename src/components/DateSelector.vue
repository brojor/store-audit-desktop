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
import ArrowLeft from './icons/ArrowLeft.vue';
import ArrowRight from './icons/ArrowRight.vue';

const padWithZero = (num) => num.toString().padStart(2, '0');

export default {
  components: { Spinner, ArrowLeft, ArrowRight },
  name: 'DateSelector',
  props: ['dateRange'],
  methods: {
    next() {
      const newInterval = this.dateRange.mapEndpoints((date) => date.plus({ quarters: 2 }));
      this.$emit('change', newInterval);
    },
    prev() {
      const newInterval = this.dateRange.mapEndpoints((date) => date.minus({ quarters: 2 }));
      this.$emit('change', newInterval);
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    formatedString() {
      const { start, end } = this.dateRange;
      const firstPart = `${padWithZero(start.month)}/${start.year}`;
      const seccondPart = `${padWithZero(end.month - 1)}/${end.year}`;
      return `${firstPart} - ${seccondPart}`;
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
