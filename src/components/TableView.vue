<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <td><DateSelector /></td>
          <td>{{ formatDate(audits[0].date) }}</td>
          <td>{{ formatDate(audits[1].date) }}</td>
          <td>{{ formatDate(audits[2].date) }}</td>
          <td>{{ formatDate(audits[3].date) }}</td>
          <td>{{ formatDate(audits[4].date) }}</td>
          <td>{{ formatDate(audits[5].date) }}</td>
        </tr>
        <tr>
          <td>
            <div class="selected-store-and-score">
              <StoreSelector />
              <h5 class="half-year-avarage">{{ showIfValid(halfYearAvaragePerc) }}</h5>
            </div>
          </td>
          <td>{{ showIfValid(audits[0].totalPerc) }}</td>
          <td>{{ showIfValid(audits[1].totalPerc) }}</td>
          <td>{{ showIfValid(audits[2].totalPerc) }}</td>
          <td>{{ showIfValid(audits[3].totalPerc) }}</td>
          <td>{{ showIfValid(audits[4].totalPerc) }}</td>
          <td>{{ showIfValid(audits[5].totalPerc) }}</td>
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
          <th>{{ showIfValid(audits[0].categories[catIndex].totalPerc) }}</th>
          <th>{{ showIfValid(audits[1].categories[catIndex].totalPerc) }}</th>
          <th>{{ showIfValid(audits[2].categories[catIndex].totalPerc) }}</th>
          <th>{{ showIfValid(audits[3].categories[catIndex].totalPerc) }}</th>
          <th>{{ showIfValid(audits[4].categories[catIndex].totalPerc) }}</th>
          <th>{{ showIfValid(audits[5].categories[catIndex].totalPerc) }}</th>
        </tr>
        <tr
          v-for="(categoryPoint, catPointIndex) in category.categoryPoints"
          :key="categoryPoint.num"
          class="category-point"
        >
          <td>{{ categoryPoint.name }}</td>
          <td
            v-for="(audit, index) in audits"
            :key="index"
            :comment="audits[index].categories[catIndex].categoryPoints[catPointIndex].comment"
          >
            <MySvg
              :status="audits[index].categories[catIndex].categoryPoints[catPointIndex].accepted"
              :size="16"
            ></MySvg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DateSelector from '@/components/DateSelector.vue';
import StoreSelector from '@/components/StoreSelector.vue';
import MySvg from '@/components/MySvg.vue';
import categories from './categories.json';

export default {
  name: 'TableView',
  components: {
    DateSelector,
    StoreSelector,
    MySvg,
  },
  data() {
    return {
      categories,
    };
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
  },
  created() {
    this.$store.commit('SET_SELECTED_STORE', this.$store.state.stores[0].id);
    this.$store.dispatch('getAudits');
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
  background-color: #fff3c6;
  position: relative;
  animation: blinking-background normal 1s infinite ease-in-out;
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

@-webkit-keyframes blinking-background {
  0% {
    background-color: rgb(255, 243, 198, 1);
  }
  100% {
    background-color: #ffebeb;
  }
}
</style>
