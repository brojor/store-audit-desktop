<template>
  <canvas id="myChart"></canvas>
</template>

<script>
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';

import options from './barChartOptions';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

export default {
  name: 'BarChart',
  props: ['chartData'],
  data() {
    return {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'My First Dataset',
            data: this.chartData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options,
    };
  },
  mounted() {
    const ctx = document.getElementById('myChart');
    // eslint-disable-next-line no-new
    new Chart(ctx, this.$data);
  },
  watch: {
    chartData() {
      const ctx = document.getElementById('myChart');
      // eslint-disable-next-line no-new
      new Chart(ctx, this.$data);
    },
  },
};
</script>

<style scoped></style>
