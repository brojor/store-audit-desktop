<template>
  <thead>
    <tr>
      <td>
        <DateSelector :dateRange="dateRange" @change="dateRangeChanged($event)" />
      </td>
      <td v-for="audit in audits" :key="audit._id">{{ formatDate(audit.date) }}</td>
    </tr>
    <tr>
      <td>
        <div class="selected-store-and-score">
          <StoreSelector @change="storeIdChanged" />
          <h5 class="half-year-avarage">{{ showIfValid(halfYearAvaragePerc) }}</h5>
        </div>
      </td>
      <td v-for="audit in audits" :key="audit._id">{{ showIfValid(audit.totalScore.perc) }}</td>
    </tr>
  </thead>
</template>

<script>
import DateSelector from '@/components/DateSelector.vue';
import StoreSelector from './StoreSelector.vue';

export default {
  components: {
    DateSelector,
    StoreSelector,
  },
  methods: {
    storeIdChanged() {
      this.$store.dispatch('getAudits', this.dateRange);
    },
    dateRangeChanged(dateRange) {
      this.$store.commit('SET_DATE_RANGE', dateRange);
      this.$store.dispatch('getAudits');
    },
  },
  computed: {
    audits() {
      return this.$store.state.audits;
    },
    dateRange() {
      return this.$store.state.dateRange;
    },
    formatDate() {
      return this.$store.getters.formatDate;
    },
    showIfValid() {
      return (value) => (value >= 0 ? `${value.toFixed(1)}%` : '');
    },
    halfYearAvaragePerc() {
      return this.$store.getters.halfYearAvaragePerc;
    },
  },
  mounted() {
    this.$store.dispatch('getAudits');
  },
};
</script>

<style></style>
