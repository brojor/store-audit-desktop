<template>
  <main>
    <h1>Desktop view</h1>
    <div class="totalPerc">
      <div class="col1">Celkový počet procent</div>
      <div class="col2">{{ summaryPercAvailable }}</div>
      <div class="col2">93%</div>
      <div class="col2">85%</div>
    </div>
    <div
      v-for="(katVal, katKey, katIndex) in dataStore"
      :key="katIndex"
      class="kategory"
    >
      <div class="row">
        <h3 class="title col1">{{ kategories[katKey] }}</h3>
        <div class="pointPerc col2">
          {{ calcTotalGained(katKey) }}|{{ calcAchievedScore(katKey) }}|{{
            calcKategoryPerc(katKey)
          }}
          %
        </div>
        <div class="pointPerc col2">45%</div>
        <div class="pointPerc col2">78%</div>
      </div>
      <div class="points">
        <div
          class="row"
          v-for="(pointVal, pointKey, pointIndex) in katVal"
          :key="pointIndex"
        >
          <div class="pointName col1">{{ points[katKey][pointKey] }}</div>
          <div class="status col2" :title="dataStore[katKey][pointKey].note">
            <MySvg
              :status="dataStore[katKey][pointKey].status"
              :size="16"
            ></MySvg>
          </div>
          <div class="status col2">splněno</div>
          <div class="status col2">splněno</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MySvg from '@/components/MySvg.vue';
import dataStore from '../../dataStore';
import { kategories, points, weights } from '../../names';

export default {
  name: 'DesktopView',
  components: { MySvg },

  data() {
    return {
      dataStore,
      kategories,
      points,
      weights,
    };
  },
  methods: {
    calcTotalAvailable(kategory) {
      return Object.values(this.weights[kategory]).reduce(
        (acc, val) => acc + val,
      );
    },
    calcTotalGained(kategory) {
      return Object.keys(this.weights[kategory]).reduce((acc, point) => {
        if (this.dataStore[kategory][point].status === 'accepted') {
          return acc + weights[kategory][point];
        }
        return acc;
      }, 0);
    },
    calcKategoryPerc(kategory) {
      const available = Object.values(this.weights[kategory]).reduce(
        (acc, val) => acc + val,
      );
      const gained = Object.keys(this.weights[kategory]).reduce(
        (acc, point) => {
          if (this.dataStore[kategory][point].status === 'accepted') {
            return acc + weights[kategory][point];
          }
          return acc;
        },
        0,
      );
      return ((gained * 100) / available).toFixed(1);
    },
    calcAchievedScore(kat) {
      return Object.values(this.achievedScore[kat]).reduce(
        (acc, val) => acc + val,
      );
    },
  },
  computed: {
    summaryPercAvailable() {
      const katWeights = Object.values(this.weights);
      // eslint-disable-next-line
      const summs = katWeights.map((obj) => {
        return Object.values(obj).reduce((acc, val) => acc + val);
      });
      return summs.reduce((acc, val) => acc + val);
    },
    summaryPercGained() {
      // eslint-disable-next-line
      const gainedWeights = Object.keys(this.weights).map((kat) => {
        // eslint-disable-next-line
        return Object.keys(this.dataStore[kat]).map((point) => {
          return this.dataStore[kat][point].status === 'accepted'
            ? this.weights[kat][point]
            : 0;
        });
      });
      // eslint-disable-next-line
      return gainedWeights.map((obj) => {
        return Object.values(obj).reduce((acc, val) => acc + val);
      });
    },
    achievedScore() {
      const result = {};
      Object.keys(this.weights).forEach((kat) => {
        result[kat] = {};
        Object.keys(this.dataStore[kat]).forEach((point) => {
          // eslint-disable-next-line
          result[kat][point] =
            this.dataStore[kat][point].status === 'accepted'
              ? this.weights[kat][point]
              : 0;
        });
      });
      return result;
    },
  },
};
</script>

<style lang="css" scoped>
h3.title {
  background-color: #fec5bb;
}

.row {
  display: flex;
  border-bottom: 1px solid black;
  /*justify-content: space-between;*/
}
.pointName {
  background: #fcd5ce;
  padding: 0.75rem;
  text-align: left;
}
.status {
  background: #fae1dd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col1 {
  border-right: 1px solid black;
  width: 500px;
}
.col2 {
  border-right: 1px solid black;
  width: 100px;
}
.pointPerc {
  background-color: #fec5bb;
}
.totalPerc {
  display: flex;
  background: #783f8e;
  font-size: 1.6rem;
}
.totalPerc div {
  padding: 0.5rem;
}
</style>
