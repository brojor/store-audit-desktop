<template>
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
        <td>Celkem za pololetí {{ halfYearAvaragePerc.toFixed(1) }}%</td>
        <td>{{ audits[0].totalPerc.toFixed(1) }}%</td>
        <td>{{ audits[1].totalPerc.toFixed(1) }}%</td>
        <td>{{ audits[2].totalPerc.toFixed(1) }}%</td>
        <td>{{ audits[3].totalPerc.toFixed(1) }}%</td>
        <td>{{ audits[4].totalPerc.toFixed(1) }}%</td>
        <td>{{ audits[5].totalPerc.toFixed(1) }}%</td>
      </tr>
    </thead>
    <tbody
      v-for="(category, catIndex) in categories"
      :key="category.num"
      :id="`cat${category.num}`"
      class="category"
    >
      <tr class="category-heading">
        <th>{{ category.name }} [{{ $store.getters.averagePerc(catIndex) }}]</th>
        <th>{{ audits[1].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ audits[0].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ audits[2].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ audits[3].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ audits[4].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ audits[5].categories[catIndex].totalPerc.toFixed(1) }}%</th>
      </tr>
      <tr
        v-for="(categoryPoint, catPointIndex) in category.categoryPoints"
        :key="categoryPoint.num"
        class="category-point"
      >
        <td>{{ categoryPoint.name }}</td>
        <td>{{ audits[0].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ audits[1].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ audits[2].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ audits[3].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ audits[4].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ audits[5].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DateSelector from '@/components/DateSelector.vue';
import categories from './categories.json';

export default {
  name: 'TableView',
  components: {
    DateSelector,
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
  },
  created() {
    this.$store.dispatch('getAudits');
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 0.75rem;
}
td:not(:first-child),
th:not(:first-child) {
  width: 70px;
  max-width: 10%;
}

td:first-child,
th:first-child {
  width: 40%;
}
table {
  margin: 3rem;
  /* border: 2px solid rgb(65, 160, 65); */
  border-collapse: collapse;
  border-radius: 6px;
  border-style: hidden; /* hide standard table (collapsed) border */
  box-shadow: 0 0 0 2px rgb(0, 0, 0); /* this draws the table border  */
  overflow: hidden;
  background-color: #FFEBEB ;
}

thead {
  background-color: #e60001;
  color: white;
  font-weight: 700;
}
.category-heading {
  background-color: #FFC2C2;
}
</style>
