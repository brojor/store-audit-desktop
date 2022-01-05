<template>
  <main>
    <div class="container">
      <header>
        <div class="left">
          <date-selector @change="dateChanged($event)" />
        </div>
        <div class="right">
          <div class="filter-category">
            <div class="filter-name">Zobrazit:</div>
            <div class="filter-options">
              <input type="radio" id="byCategories" value="categories" v-model="chartDetail" />
              <label for="byCategories">Celé kategorie</label>
              <input type="radio" id="byPoints" value="points" v-model="chartDetail" />
              <label for="byPoints">Jednotlivé body</label>
            </div>
          </div>
          <div class="filter-category">
            <div class="filter-name">Řadit dle:</div>
            <div class="filter-options">
              <input type="radio" id="byId" value="id" v-model="sort" />
              <label for="byId">Podle jména</label>
              <input type="radio" id="byDeficiencies" value="deficiencies" v-model="sort" />
              <label for="byDeficiencies">Podle nedostatků</label>
            </div>
          </div>
        </div>
      </header>
      <div class="chart-wrapper">
        <bar-chart :chartData="chartData" :colors="colors" :xAxisFontSize="xAxisFontSize" />
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
      chartDetail: 'categories',
      sort: 'id',
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
      colors: '#e6000140',
    };
  },
  computed: {
    xAxisFontSize() {
      return this.chartDetail === 'categories' ? 12 : 10;
    },
  },
  watch: {
    chartDetail() {
      this.fetchData();
    },
    sort() {
      this.fetchData();
    },
  },
  methods: {
    dateChanged(newRange) {
      this.dateRange = newRange;
      this.fetchData();
    },
    fetchData() {
      categoryPointsDeficiencies(this.dateRange, this.chartDetail, this.sort)
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
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.right {
  display: flex;
  justify-content: center;
  width: 50%;
  align-items: center;
  /* background-color: rgb(168, 168, 168); */
}
.filter-category {
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-name {
  font-size: 1.4rem;
  margin-right: 1rem;
  font-weight: 800;
  /* padding: 0.5rem; */
}
.filter-options {
  background-color: #fff;
  height: 3rem;
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
