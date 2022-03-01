<template>
  <canvas id="myChart" ref="myChart"></canvas>
</template>

<script>
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import options from './barChartOptions';

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip);

let myBarChart;

export default {
  name: 'BarChart',
  props: ['chartData', 'levelOfDetail'],
  data() {
    return {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Počet nedostatků',
            data: this.chartData,
            borderColor: '#e60001',
            borderWidth: 1,
            backgroundColor: '#e6000140',
          },
        ],
      },
      options,
    };
  },

  mounted() {
    const ctx = this.$refs.myChart;
    myBarChart = new Chart(ctx, this.$data);
  },
  watch: {
    chartData() {
      myBarChart.data.datasets[0].data = this.chartData;
      myBarChart.update();
    },
    levelOfDetail() {
      // eslint-disable-next-line operator-linebreak
      myBarChart.options.scales.xAxis.ticks.font.size =
        this.levelOfDetail === 'categories' ? 12 : 10;
      myBarChart.update();
      myBarChart.options.parsing.xAxisKey = this.levelOfDetail === 'categories' ? 'label' : 'id';
    },
  },
};
</script>

<style scoped></style>
