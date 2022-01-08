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

// let myBarChart;

export default {
  name: 'BarChart',
  props: ['chartData', 'colors', 'levelOfDetail'],
  data() {
    return {
      myBarChart: null,
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
    this.myBarChart = new Chart(ctx, this.$data);
  },
  beforeDestroy() {
    this.myBarChart.destroy();
  },
  watch: {
    chartData() {
      this.myBarChart.data.datasets[0].data = this.chartData;
      this.myBarChart.update();
    },
    colors() {
      this.myBarChart.data.datasets[0].backgroundColor = this.colors;
      this.myBarChart.update();
    },
    levelOfDetail() {
      // eslint-disable-next-line operator-linebreak
      this.myBarChart.options.scales.xAxis.ticks.font.size =
        this.levelOfDetail === 'categories' ? 12 : 10;
      this.myBarChart.update();
      this.myBarChart.options.parsing.xAxisKey =
        this.levelOfDetail === 'categories' ? 'label' : 'id';
    },
  },
};
</script>

<style scoped></style>
