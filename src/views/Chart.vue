<template>
  <div>
    <h1>chartt</h1>
    <bar-chart-base :chartdata="chartData" />
  </div>
</template>
<script>
import BarChartBase from '../components/BarChartBase.vue';

export default {
  components: { BarChartBase },
  data() {
    return {
      chartData: {
        labels: ['lefen', 'unor', 'březen', 'duven'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [11, 8, 9, 4],
            borderColor: '#023436 ',
            backgroundColor: '#03B5AA',
          },
          {
            label: 'Dataset 2',
            data: [14, 3, 9, 10],
            borderColor: '#493657',
            backgroundColor: '#CE7DA5',
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
