<template>
  <tr class="category-heading">
    <th>
      <div class="category-name-and-perc">
        <p>{{ category.name }}</p>
        <p v-show="avarageScorePerc(catIndex) >= 0">Ø {{ avarageScorePerc(catIndex).toFixed(1) }} %</p>
      </div>
    </th>
    <th v-for="audit in audits" :key="audit._id">{{ categoryScore(audit) }}</th>
  </tr>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  props: ['category', 'catIndex'],
  methods: {
    categoryScore(audit) {
      return this.showIfValid(audit.categories[this.catIndex].score.perc);
    },
    showIfValid(value) {
      return value >= 0 ? `${value.toFixed(1)}%` : '';
    },
  },
  computed: { ...mapGetters(['avarageScorePerc']), ...mapState(['audits']) },
};
</script>
