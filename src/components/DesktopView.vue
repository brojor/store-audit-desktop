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
      v-for="(points, katKey, katIndex) in pointNames"
      :key="katIndex"
      class="kategory"
    >
      <div class="row">
        <h3 class="title col1">{{ katNames[katKey] }}</h3>
        <div
          v-for="(audit, auditIndex) in audits"
          :key="auditIndex"
          class="pointPerc col2"
        >
          {{ katScoreAchieved(auditIndex, katKey) }} %
        </div>
      </div>

      <div class="points">
        <div
          class="row"
          v-for="(pointName, pointKey, pointIndex) in points"
          :key="pointIndex"
        >
          <div class="pointName col1">{{ pointName }}</div>
          <div
            v-for="(audit, auditIndex) in audits"
            :key="auditIndex"
            class="status col2"
          >
            <MySvg
              :status="audit.results[katKey][pointKey].status"
              :size="16"
            ></MySvg>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MySvg from '@/components/MySvg.vue';
import dataStore from '../../dataStore';
import audits from '../../dataStore2';
import { katNames, pointNames, weights } from '../../names';

export default {
  name: 'DesktopView',
  components: { MySvg },

  data() {
    return {
      audits,
      dataStore,
      katNames,
      pointNames,
      weights,
    };
  },
  methods: {
    katScoreAchieved(auditIndex, katKey) {
      const available = Object.values(this.weights[katKey]).reduce(
        (acc, val) => acc + val,
      );
      const achieved = Object.values(
        this.achievedScore[auditIndex][katKey],
      ).reduce((acc, val) => acc + val);
      return ((achieved * 100) / available).toFixed(2);
    },

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
    // achievedScore() {
    //   const result = {};
    //   Object.keys(this.weights).forEach((kat) => {
    //     result[kat] = {};
    //     Object.keys(this.dataStore[kat]).forEach((point) => {
    //       // eslint-disable-next-line
    //       result[kat][point] =
    //         this.dataStore[kat][point].status === 'accepted'
    //           ? this.weights[kat][point]
    //           : 0;
    //     });
    //   });
    //   return result;
    // },
    // testComp() {
    //   return this.audits.reduce((auditsObj, audit, index) => {
    //     // eslint-disable-next-line
    //     auditsObj[index] = Object.keys(this.weights).reduce(
    //       (katsObj, katKey) => {
    //         // eslint-disable-next-line
    //         katsObj[katKey] = this.weights[katKey];
    //         return katsObj;
    //       },
    //       {},
    //     );

    //     return auditsObj;
    //   }, {});
    // },
    /* eslint-disable no-param-reassign */
    achievedScore() {
      return this.audits.reduce((auditsObj, audit, index) => {
        auditsObj[index] = Object.keys(audit.results).reduce((res, katKey) => {
          res[katKey] = Object.keys(audit.results[katKey]).reduce(
            (res2, pointKey) => {
              // prettier-ignore
              res2[pointKey] = audit.results[katKey][pointKey].status === 'accepted'
                ? this.weights[katKey][pointKey]
                : 0;
              return res2;
            },
            {},
          );
          return res;
        }, {});
        return auditsObj;
      }, {});
    },
    /* eslint-enable no-param-reassign */
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
