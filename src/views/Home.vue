<template>
  <div class="table-wrapper">
    <table>
      <table-header />
      <audit-category
        v-for="(category, catIndex) in categories"
        :key="category.num"
        :category="category"
        :catIndex="catIndex"
      />
    </table>
  </div>
</template>

<script>
import categories from '../components/categories.json';
// import RangeMaker from '../utils/RangeMaker';

import AuditCategory from '../components/AuditCategory.vue';
import TableHeader from '../components/TableHeader.vue';

export default {
  name: 'TableView',
  components: {
    AuditCategory,
    TableHeader,
  },
  data() {
    return {
      categories,
    };
  },
  computed: {
    formatDate() {
      return this.$store.getters.formatDate;
    },
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
