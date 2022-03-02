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
          <universal-selector :options="options" @change="storeIdChanged($event)" />
          <h5 class="half-year-avarage">{{ showIfValid(avarageScorePerc()) }}</h5>
        </div>
      </td>
      <td v-for="audit in audits" :key="audit._id">{{ showIfValid(audit.totalScore.perc) }}</td>
    </tr>
  </thead>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import DateSelector from '../DateSelector.vue';
import UniversalSelector from '../UniversalSelector.vue';

export default {
  components: {
    DateSelector,
    UniversalSelector,
  },
  methods: {
    storeIdChanged(store) {
      this.$store.commit('SET_SELECTED_STORE', store.id);
      this.$store.dispatch('getAudits');
    },
    dateRangeChanged(dateRange) {
      this.$store.commit('SET_DATE_RANGE', dateRange);
      this.$store.dispatch('getAudits');
    },
  },
  computed: {
    showIfValid() {
      return (value) => (value >= 0 ? `${value.toFixed(1)}%` : '');
    },
    options() {
      return this.$store.state.stores.map(({ name: title, id }) => ({ id, title }));
    },
    ...mapState(['audits', 'dateRange']),
    ...mapGetters(['formatDate', 'avarageScorePerc']),
  },
  mounted() {
    this.$store.dispatch('getAudits');
  },
};
</script>
