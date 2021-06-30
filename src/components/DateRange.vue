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
      this.range = rangeMaker.getNext();
    },
    prev() {
      this.range = rangeMaker.getPrev();
    },
    send() {
      Api.getAudits(this.range);
    },
  },
  created() {
    this.range = rangeMaker.getRange();
  },
  computed: {
    formatDate() {
      return (date) => {
        const [, month, year] = date.toLocaleDateString().split('. ');
        return `${month.padStart(2, '0')}/${year}`;
      };
    },
  },
};
</script>

<style></style>
