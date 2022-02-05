<template>
  <main>
    <div class="container">
      <chart-header @change="changeFilter($event)" :dateRange="filter.dateRange" />
      <chart-body :loading="loading" :chartData="chartData" :levelOfDetail="filter.detailLevel" />
    </div>
  </main>
</template>

<script>
import ChartHeader from '../components/ChartHeader.vue';
import { deficiencies } from '../services/chartService';
import { getDateRange } from '../utils/DateRange';
import ChartBody from '../components/ChartBody.vue';

export default {
  name: 'ChartView',
  components: {
    ChartHeader,
    ChartBody,
  },
  data() {
    return {
      loading: false,
      filter: {
        dateRange: getDateRange(),
        detailLevel: 'categories',
        sortBy: 'id',
        storesFilter: {
          type: '',
          id: '',
        },
      },
      chartData: [],
    };
  },
  methods: {
    changeFilter({ type, value }) {
      this.filter[type] = value;
    },
    fetchData() {
      this.loading = true;
      deficiencies(this.filter)
        .then(({ data }) => {
          this.chartData = data;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.fetchData();
      },
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
}
.container {
  margin-top: 2rem;
  width: 80vw;
  border: 2px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
