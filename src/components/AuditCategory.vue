<template>
  <tbody :id="`cat${category.num}`" class="category">
    <category-header :audits="audits" :category="category" :catIndex="catIndex" />
    <category-results
      v-for="(categoryPoint, catPointIndex) in category.categoryPoints"
      :key="categoryPoint.num"
      :categoryPoint="categoryPoint"
      :catPointIndex="catPointIndex"
      :audits="audits"
      :catIndex="catIndex"
    />
  </tbody>
</template>

<script>
import CategoryHeader from './CategoryHeader.vue';
import CategoryResults from './CategoryResults.vue';

export default {
  props: ['catIndex', 'category', 'audits'],
  components: {
    CategoryHeader,
    CategoryResults,
  },
};
</script>

<style></style>
