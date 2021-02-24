<template>
  <main>
    <div class="main-container">
      <header>
        <div class="row kategory">
          <StoreSelector
            class="col1"
            @storeChanged="toggleStore"
          ></StoreSelector>
          <div
            class="col2 center-x-y date"
            v-for="(audit, index) in audits"
            :key="index"
          >
            {{ audit.month }}
          </div>
        </div>
        <div class="container">
          <div class="totalPerc">
            <div class="col1 flex total-score">
              <h5 class="absolute">Celkem:</h5>
              <h5 class="bubble">{{ halfYearScore.toFixed(2) }} %</h5>
            </div>
            <div
              v-for="(audit, auditIndex) in audits"
              :key="auditIndex"
              class="col2 center-x-y"
            >
              <h5>{{ totalScorePerAudit(auditIndex) }} %</h5>
            </div>
          </div>
        </div>
      </header>

      <div
        v-for="(points, katKey, katIndex) in pointNames"
        :key="katIndex"
        class="kategory"
      >
        <div class="container">
          <div class="row">
            <div class="title col1">
              <h3>{{ katNames[katKey] }}</h3>
              <h3>Celkem: {{ totalScoreInKat(katKey).toFixed(2) }}%</h3>
            </div>

            <div
              v-for="(audit, auditIndex) in audits"
              :key="auditIndex"
              class="pointPerc col2"
            >
              {{ katScorePerc(auditIndex, katKey).toFixed(2) }} %
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
      </div>
    </div>
  </main>
</template>

<script>
import StoreSelector from '@/components/StoreSelector.vue';
import MySvg from '@/components/MySvg.vue';
import dataStore from '../../dataStore';
import store1015 from '../../1015';
import store1016 from '../../1016';
import store1018 from '../../1018';

import { katNames, pointNames, weights } from '../../names';

export default {
  name: 'DesktopView',
  components: { MySvg, StoreSelector },

  data() {
    return {
      stores: { store1015, store1016, store1018 },
      audits: store1015,
      dataStore,
      katNames,
      pointNames,
      weights,
    };
  },
  methods: {
    toggleStore(store) {
      this.audits = this.stores[store];
    },

    katScorePerc(auditIndex, katKey) {
      const available = Object.values(this.weights[katKey]).reduce(
        (acc, val) => acc + val,
      );
      const achieved = Object.values(
        this.achievedScore[auditIndex][katKey],
      ).reduce((acc, val) => acc + val);
      return (achieved * 100) / available;
    },
    totalScorePerAudit(auditIndex) {
      // prettier-ignore
      const totalAvailable = Object.values(this.weights)
        .map((kat) => Object.values(kat).reduce(
          (acc, pointWeight) => acc + pointWeight,
        ))
        .reduce((acc, val) => acc + val);

      const totalAchieved = Object.values(
        this.achievedScore[auditIndex],
      ).reduce(
        // prettier-ignore
        (acc, points) => acc + Object.values(points).reduce((acc2, val) => acc2 + val),
        0,
      );
      return (totalAchieved * 100) / totalAvailable;
    },
    totalScoreInKat(kategory) {
      const maxScore = Object.values(this.weights[kategory]).reduce(
        (acc, val) => acc + val,
      );
      const available = maxScore * this.numOfAudits;
      const achieved = Object.values(this.achievedScore)
        .map((audit) => Object.values(audit[kategory]))
        .flat()
        .reduce((acc, val) => acc + val);
      return (achieved * 100) / available;
    },
  },
  computed: {
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
    numOfAudits() {
      return this.sumPoints.filter((score) => score > 0).length;
    },
    maxScorePerAudit() {
      // prettier-ignore
      return Object.values(this.weights)
        .map((kat) => Object.values(kat)
          .reduce((acc, pointWeight) => acc + pointWeight))
        .reduce((acc, val) => acc + val);
    },
    halfYearScore() {
      const achivedScore = this.sumPoints.reduce((acc, val) => acc + val);
      return (achivedScore / (this.maxScorePerAudit * this.numOfAudits)) * 100;
    },
    // vrací pole součtů celkového počtu bodů za jeden audit
    sumPoints() {
      // prettier-ignore
      return Object.values(this.achievedScore)
        .map((audit) => Object.values(audit).map((kat) => Object.values(kat)
          .reduce((acc, val) => acc + val)).reduce((a, v) => a + v));
    },

    /* eslint-enable no-param-reassign */
  },
};
</script>

<style lang="css" scoped>
header {
  background: var(--bg-dark);
}

main {
  /*justify-content: center;*/
  width: 90vw;
  margin: auto;
}

.title {
  background: var(--bg-semidark);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

.kategory {
  display: flex;
}
.sum-kat-perc {
  position: relative;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  width: 8rem;
}
.sum-kat-perc h5 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(90deg);
  font-size: 1.5rem;
}

.row {
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
  /*padding: 0.5rem;*/
  /*justify-content: space-between;*/
}
.pointName {
  background: #fcd5ce;
  background: var(--bg-mid);

  text-align: left;
}
.status {
  /*background: #fae1dd;*/
  background: var(--bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
}
.col1 {
  border-right: 1px solid black;
  /*border-left: 1px solid black;*/
  /*width: 500px;*/
  flex-basis: 40%;
  /*padding: 0 1rem;*/
  padding: 0.5rem 1rem;
}
.col2 {
  border-right: 1px solid black;
  /*width: 100px;*/
  flex-basis: 10%;
}
.col2:last-child {
  border: none;
}

.pointPerc {
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: #fec5bb;*/
  background: var(--bg-semidark);
  font-size: 1.1rem;
  font-weight: 700;
  /*padding: 0.5rem;*/
}
.totalPerc {
  display: flex;
  background: #783f8e;
  background: var(--bg-dark);
  font-size: 1.6rem;
  border-bottom: 1px solid black;
  /*color: #f47920;*/
}
.totalPerc div {
  /*padding: 0.5rem;*/
}
.container {
  width: 100%;
}
.main-container {
  /*border: 1px solid black;*/
  width: 90%;
  border: 1px solid black;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}
.date {
  font-size: 1.2rem;
  /*color: white;*/
  font-weight: 700;
}
.bubble {
  background: white;
  padding: 0.25rem 1.5rem;
  border-radius: 0.75rem;
  margin: auto 2rem;
  /*font-family: 'Orbitron', sans-serif;*/
  font-size: 1.2rem;
  letter-spacing: 3px;
  margin: 0 auto;
}
.absolute {
  /*font-family: 'Orbitron', sans-serif;*/
  position: absolute;
  letter-spacing: 5px;
  font-size: 1.4rem;
}
</style>
