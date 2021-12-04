<template>
  <main>
    <div class="container">
      <header>
        <div class="left">
          <date-selector @change="dateChanged($event)" />
        </div>
        <div class="right">prodejny</div>
      </header>
      <div class="chart-wrapper">
        <bar-chart v-if="chartData.length" :chartData="chartData" />
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios';
import DateSelector from '../components/DateSelector.vue';
import BarChart from '../components/BarChart.vue';

const now = new Date();

export default {
  name: 'ChartView',
  components: { DateSelector, BarChart },
  data() {
    return {
      dateRange:
        // prettier-ignore
        now.getMonth() <= 7
          ? {
            start: new Date(Date.UTC(now.getFullYear(), 2, 1)),
            stop: new Date(Date.UTC(now.getFullYear(), 8, 1) - 1),
          }
          : {
            start: new Date(Date.UTC(now.getFullYear(), 8, 1)),
            stop: new Date(Date.UTC(now.getFullYear() + 1, 2, 1) - 1),
          },
      chartData: [],
    };
  },
  methods: {
    dateChanged(newRange) {
      this.dateRange = newRange;
      this.fetchData();
    },
    fetchData() {
      return axios
        .get('http://localhost:5000/summary')
        .then(({ data }) => {
          console.log(data);
          this.chartData = data;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.fetchData();
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
  height: 80vh;
  border: 2px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header {
  display: flex;
  align-items: stretch;
  background-color: #e60001;
}

.left {
  width: 50%;
  padding: 1rem;
}

.chart-wrapper {
  background-color: #fff;
  flex-grow: 1;
}
</style>
