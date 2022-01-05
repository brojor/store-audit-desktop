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

let myBarChart;

export default {
  name: 'BarChart',
  props: ['chartData', 'colors', 'levelOfDetail'],
  data() {
    return {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Počet nedostatků',
            data: this.chartData,
            // fill: false,
            borderColor: '#e60001',
            borderWidth: 1,
            backgroundColor: this.colors,
            // tension: 0.1,
          },
        ],
      },
      options,
    };
  },

  mounted() {
    const ctx = document.getElementById('myChart');
    myBarChart = new Chart(ctx, this.$data);
  },
  watch: {
    chartData() {
      myBarChart.data.datasets[0].data = this.chartData;
      myBarChart.update();
    },
    colors() {
      myBarChart.data.datasets[0].backgroundColor = this.colors;
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
