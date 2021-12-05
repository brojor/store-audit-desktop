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
        <bar-chart :chartData="chartData" />
      </div>
    </div>
  </main>
</template>
<script>
import categoryPointsDeficiencies from '../services/chartService';
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
      categoryPointsDeficiencies(this.dateRange)
        .then(({ data }) => {
          this.chartData = data;
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
        const counts = [6, 10, 8, 9, 3, 5, 5, 11, 7, 6, 10];
        return counts.reduce((arr, count, i) => {
          const color = colors[i];
          [...Array(count)].forEach(() => arr.push(color));
          return arr;
        }, []);
      }

      this.colors = setColors(colors);
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
  /* height: 80vh; */
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
