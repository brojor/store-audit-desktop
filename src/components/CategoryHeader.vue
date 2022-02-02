<template>
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
</template>

<script>
export default {
  props: ['category', 'catIndex'],
  methods: {
    categoryScore(audit, catIndex) {
      return this.showIfValid(audit.categories[catIndex].score.perc);
    },
    showIfValid(value) {
      return value >= 0 ? `${value.toFixed(1)}%` : '';
    },
  },
  computed: {
    audits() {
      return this.$store.state.audits;
    },
  },
};
</script>
