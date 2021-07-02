<template>
  <div>
    <h1>ahoj from date range component</h1>
    <span>{{ formatDate(range.start) }} - {{ formatDate(range.stop) }}</span>
    <button @click="prev">Prev</button>
    <button @click="next">Next</button>
    <br />
    <button @click="send">send</button>
  </div>
</template>

<script>
import RangeMaker from '../utils/RangeMaker';
import Api from '../services/Api';

const rangeMaker = new RangeMaker();

export default {
  name: 'DateRange',

  data() {
    return {
      range: { start: {}, stop: {} },
    };
  },
  methods: {
    next() {
      this.$store.dispatch('nextDateRange');
    },
    prev() {
      this.$store.dispatch('prevDateRange');
    },
    send() {
      Api.getAudits(this.range)
        .then(({ data }) => {
          this.$store.commit('SET_AUDITS_DATA', data);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.range = rangeMaker.getRange();
  },
  computed: {
    formatDate() {
      return this.$store.getters.formatDate;
    },
  },
};
</script>

<style></style>
