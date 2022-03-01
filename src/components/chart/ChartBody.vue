<template>
  <div class="chart-wrapper">
    <div v-if="loading" class="backdrop">
      <circle-loader color="#444" size="100px" />
    </div>
    <bar-chart :chartData="chartData" :levelOfDetail="levelOfDetail" />
  </div>
</template>

<script>
import CircleLoader from './CircleLoader.vue';
import BarChart from './BarChart.vue';

export default {
  props: ['chartData', 'levelOfDetail', 'loading'],
  components: {
    CircleLoader,
    BarChart,
  },
};
</script>

<style>
.chart-wrapper {
  background-color: #fff;
  flex-grow: 1;
  position: relative;
}
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
</style>
