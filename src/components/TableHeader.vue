<template>
  <thead>
    <tr>
      <td>
        <DateSelector :dateRange="dateRange" @change="dateChanged($event)" />
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
import StoreSelector from '@/components/StoreSelector.vue';
import { getDateRange } from '../utils/DateRange';

export default {
  props: ['audits'],
  components: {
    DateSelector,
    StoreSelector,
  },
  data() {
    return {
      dateRange: getDateRange(),
    };
  },
  methods: {
    dateChanged(newRange) {
      this.dateRange = newRange;
      this.$store.dispatch('getAudits', this.dateRange);
    },
    storeIdChanged() {
      this.$store.dispatch('getAudits', this.dateRange);
    },
  },
  computed: {
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
    this.$store.dispatch('getAudits', this.dateRange);
  },
};
</script>

<style></style>
