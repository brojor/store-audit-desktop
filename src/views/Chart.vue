<template>
  <main>
    <div class="container">
      <chart-header @change="handleChange($event)" :dateRange="filter.dateRange" />
      <div class="chart-wrapper">
        <div v-if="loading" class="backdrop">
          <circle-loader color="#444" size="100px" />
        </div>
        <bar-chart :chartData="chartData" :levelOfDetail="filter.detailLevel" :colors="colors" />
      </div>
    </div>
  </main>
</template>

<script>
import BarChart from '../components/BarChart.vue';
import CircleLoader from '../components/circleLoader.vue';
import ChartHeader from '../components/ChartHeader.vue';
import { deficiencies } from '../services/chartService';
import { getDateRange } from '../utils/DateRange';

export default {
  name: 'ChartView',
  components: {
    BarChart,
    CircleLoader,
    ChartHeader,
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
      colors: '#e6000140',
    };
  },
  computed: {
    xAxisFontSize() {
      return this.filter.detailLevel === 'categories' ? 12 : 10;
    },
  },

  methods: {
    handleChange({ type, value }) {
      console.log({ type, value });
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
    colorize() {
      console.log('coloruji');
      const colors = [
        '#FFCD4F',
        '#F2501A',
        '#84FF00',
        '#8C3FFF',
        '#5BD35B',
        '#4DFFEA',
        '#C00202',
        '#31A6FF',
        '#133C88',
        '#FF4FED',
        '#8C1084',
      ];
      function setColors() {
        const counts = [6, 8, 10, 5, 7, 10, 6, 5, 9, 3, 11];
        return counts.reduce((arr, count, i) => {
          const color = colors[i];
          [...Array(count)].forEach(() => arr.push(color));
          return arr;
        }, []);
      }

      this.colors = setColors(colors);
    },
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        console.log('watch - jdu stáhnout data');
        this.fetchData();
      },
    },
  },
};
</script>

<style scoped>
.backdrop {
  transition: background-color 0.5s ease-in-out;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(46, 46, 46, 0.144);
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  /* background-color: rgba(255, 255, 255, 0.418);
  width: 15rem;
  height: 15rem; */
  border-radius: 3rem;
}

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
.filter-options {
  background-color: #fff;
  height: 1.5rem;
  padding: 0 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
label {
  margin: 0.25rem;
}

main {
  display: flex;
  justify-content: center;
}

.container {
  margin-top: 2rem;
  width: 80vw;
  /* height: 80vh; */
  border: 2px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-wrapper {
  background-color: #fff;
  flex-grow: 1;
  position: relative;
}
</style>
