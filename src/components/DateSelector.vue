<template>
  <div class="main">
    <button @click="prev">
      <svg
        width="32px"
        height="32px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        color="#000000"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0
          01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <div class="date-range-wrapper">
      <spinner v-if="loading" />
      <h1 v-else>{{ formatedString }}</h1>
    </div>

    <button @click="next">
      <svg
        width="32px"
        height="32px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        color="#000000"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0
          011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';
import RangeMaker from '../utils/RangeMaker';

const rangeMaker = new RangeMaker();

export default {
  components: { Spinner },
  name: 'DateSelector',
  data() {
    return {
      dateRange: rangeMaker.getRange(),
    };
  },
  methods: {
    next() {
      this.dateRange = rangeMaker.getNext();
      this.$emit('change', this.dateRange);
    },
    prev() {
      this.dateRange = rangeMaker.getPrev();
      this.$emit('change', this.dateRange);
    },
    formatDate(date) {
      const dateObj = new Date(date);
      const [, month, year] = dateObj.toLocaleDateString().split('. ');
      return `${month.padStart(2, '0')}/${year}`;
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
