<template>
  <table>
    <thead>
      <tr>
        <td>prodejna 1015</td>
        <td>{{ store1910[0].date }}</td>
        <td>{{ store1910[1].date }}</td>
        <td>{{ store1910[2].date }}</td>
        <td>{{ store1910[3].date }}</td>
        <td>{{ store1910[4].date }}</td>
        <td>{{ store1910[5].date }}</td>
      </tr>
      <tr>
        <td>Celkem celkově</td>
        <td>{{ store1910[0].totalPerc.toFixed(1) }}%</td>
        <td>{{ store1910[1].totalPerc.toFixed(1) }}%</td>
        <td>{{ store1910[2].totalPerc.toFixed(1) }}%</td>
        <td>{{ store1910[3].totalPerc.toFixed(1) }}%</td>
        <td>{{ store1910[4].totalPerc.toFixed(1) }}%</td>
        <td>{{ store1910[5].totalPerc.toFixed(1) }}%</td>
      </tr>
    </thead>
    <tbody
      v-for="(category, catIndex) in categories"
      :key="category.num"
      :id="`cat${category.num}`"
      class="category"
    >
      <tr>
        <th>{{ category.name }}</th>
        <th>{{ store1910[1].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ store1910[0].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ store1910[2].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ store1910[3].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ store1910[4].categories[catIndex].totalPerc.toFixed(1) }}%</th>
        <th>{{ store1910[5].categories[catIndex].totalPerc.toFixed(1) }}%</th>
      </tr>
      <tr
        v-for="(categoryPoint, catPointIndex) in category.categoryPoints"
        :key="categoryPoint.num"
        class="category-point"
      >
        <td>{{ categoryPoint.name }}</td>
        <td>{{ store1910[0].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ store1910[1].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ store1910[2].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ store1910[3].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ store1910[4].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
        <td>{{ store1910[5].categories[catIndex].categoryPoints[catPointIndex].accepted }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import categories from './categories.json';
import store1910 from './1910.json';

export default {
  name: 'TableView',
  data() {
    return {
      categories,
      store1910,
    };
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
}
</style>
