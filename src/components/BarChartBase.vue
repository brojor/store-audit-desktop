<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['chartdata'],
  data() {
    return {
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
