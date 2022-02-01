<template>
  <div class="table-wrapper">
    <table v-if="audits[0]">
      <thead>
        <tr>
          <td>
            <DateSelector :dateRange="dateRange" @change="dateChanged($event)" />
          </td>
          <td v-for="audit in audits" :key="audit._id">{{ formatDate(audit.date) }}</td>
        </tr>
        <tr>
          <td>
            <div class="selected-store-and-score">
              <StoreSelector @change="storeIdChanged" />
              <h5 class="half-year-avarage">{{ showIfValid(halfYearAvaragePerc) }}</h5>
            </div>
          </td>
          <td v-for="audit in audits" :key="audit._id">{{ showIfValid(audit.totalScore.perc) }}</td>
        </tr>
      </thead>
      <tbody
        v-for="(category, catIndex) in categories"
        :key="category.num"
        :id="`cat${category.num}`"
        class="category"
      >
        <tr class="category-heading">
          <th>
            <div class="category-name-and-perc">
              <p>{{ category.name }}</p>
              <p v-show="$store.getters.averagePerc(catIndex) >= 0">
                Ø {{ $store.getters.averagePerc(catIndex).toFixed(1) }} %
              </p>
            </div>
          </th>
          <th v-for="audit in audits" :key="audit._id">{{ categoryScore(audit, catIndex) }}</th>
        </tr>
        <tr
          v-for="(categoryPoint, catPointIndex) in category.categoryPoints"
          :key="categoryPoint.num"
          class="category-point"
        >
          <td>{{ categoryPoint.name }}</td>
          <SuccesIndicator
            v-for="audit in audits"
            :key="audit._id"
            :audit="audit"
            :catIndex="catIndex"
            :catPointIndex="catPointIndex"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import DateSelector from '@/components/DateSelector.vue';
import StoreSelector from '@/components/StoreSelector.vue';
import categories from '../components/categories.json';
// import RangeMaker from '../utils/RangeMaker';
import { toggleResult } from '../services/AuditsService';
import { getDateRange } from '../utils/DateRange';
import SuccesIndicator from '../components/SuccesIndicator.vue';

export default {
  name: 'TableView',
  components: {
    DateSelector,
    StoreSelector,
    SuccesIndicator,
  },
  data() {
    return {
      categories,
      // dateRange: new RangeMaker().getRange(),
      dateRange: getDateRange(),
    };
  },
  methods: {
    dateChanged(newRange) {
      this.dateRange = newRange;
      this.$store.dispatch('getAudits', this.dateRange);
    },
    storeIdChanged() {
      this.$store.dispatch('getAudits', this.dateRange);
    },
    changeResult(audit, catIndex, catPointIndex) {
      const auditId = audit._id;
      const categoryPointId = audit.categories[catIndex].categoryPoints[catPointIndex].id;

      toggleResult(auditId, categoryPointId).then(({ data }) => {
        if (data.success) {
          this.$store.dispatch('getAudits', this.dateRange);
        }
      });
    },
  },
  computed: {
    audits() {
      return this.$store.state.audits;
    },
    formatDate() {
      return this.$store.getters.formatDate;
    },
    halfYearAvaragePerc() {
      return this.$store.getters.halfYearAvaragePerc;
    },
    showIfValid() {
      return (value) => (value >= 0 ? `${value.toFixed(1)}%` : '');
    },
    categoryScore() {
      return (audit, catIndex) => this.showIfValid(audit.categories[catIndex].score.perc);
    },
  },
  mounted() {
    this.$store.dispatch('getAudits', this.dateRange);
  },
};
</script>

<style>
.table-wrapper {
  display: flex;
  justify-content: center;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 0.5rem 1rem;
}
th {
  padding: 0.75rem 1rem;
}

td:first-child,
th:first-child {
  min-width: 464px;
  width: 40%;
}
table {
  margin: 2rem;
  border-collapse: collapse;
  border-radius: 6px;
  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 2px rgb(0, 0, 0); /* this draws the table border  */
  overflow: hidden;
  background-color: #ffebeb;
  font-size: 1rem;
  max-width: 1140px;
}

thead {
  background-color: #e60001;
  color: white;
  font-weight: 900;
  font-size: 1.4rem;
}
.category-heading {
  background-color: #ffc2c2;
  font-size: 1.2rem;
}
.category-point > td:first-child {
  text-align: left;
}

.half-year-avarage {
  background-color: #fff;
  border-radius: 4px;
  color: black;
  width: 6rem;
  padding: 0.6rem;
  margin: 0.5rem 0;
  margin-left: 1rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.category-name-and-perc {
  display: flex;
  justify-content: space-between;
}
.category-name-and-perc > p > span {
  font-weight: normal;
  margin-right: 3px;
  /* font-size: 1rem; */
}
.selected-store-and-score {
  display: flex;
}

td[comment] {
  /* background-color: #fff3c6; */
  position: relative;
}
td[rep] {
  background-color: #cfbebe;
}
td[rep='1'] {
  background-color: #ffebeb;
}

td[comment]::before,
td[comment]::after {
  --scale: 0;
  --arrow-size: 10px;
  --tooltip-color: #e60001;

  position: absolute;
  top: -0.25rem;
  left: 50%;
  transform: translateX(-50%) translateY(var(--translate-y, 0)) scale(var(--scale));
  transition: 150ms transform;
  transform-origin: bottom center;
}
td:last-child[comment]::before {
  transform: translateX(-85%) translateY(var(--translate-y, 0)) scale(var(--scale));
}

td[comment]::before {
  --translate-y: calc(-100% - var(--arrow-size) + 5px);
  content: attr(comment);
  color: #000;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  width: auto;
  /* min-width: 300px; */
  width: max-content;
  max-width: 300px;
  background-color: #fff;
  border: 3px solid var(--tooltip-color);
}

td[comment]:hover::before,
td[comment]:hover::after {
  --scale: 1;
}

td[comment]::after {
  --translate-y: calc(-1 * var(--arrow-size) + 5px);
  content: '';
  border: var(--arrow-size) solid transparent;
  border-top-color: var(--tooltip-color);
  transform-origin: top center;
}
td:last-child[comment]::after {
  transform-origin: left top;
  transition: transform 75ms;
}
</style>
