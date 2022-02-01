<template>
  <tbody :id="`cat${category.num}`" class="category">
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
</template>

<script>
import SuccesIndicator from './SuccesIndicator.vue';

export default {
  props: ['catIndex', 'category', 'audits'],

  components: {
    SuccesIndicator,
  },
  methods: {
    categoryScore(audit, catIndex) {
      return this.showIfValid(audit.categories[catIndex].score.perc);
    },
    showIfValid(value) {
      return value >= 0 ? `${value.toFixed(1)}%` : '';
    },
  },
};
</script>

<style></style>
