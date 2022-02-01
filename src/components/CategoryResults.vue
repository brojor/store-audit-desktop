<template>
  <tr class="category-point">
    <td>{{ categoryPoint.name }}</td>
    <SuccesIndicator
      v-for="audit in audits"
      :key="audit._id"
      :audit="audit"
      :catIndex="catIndex"
      :catPointIndex="catPointIndex"
    />
  </tr>
</template>

<script>
import SuccesIndicator from './SuccesIndicator.vue';

export default {
  props: ['audits', 'categoryPoint', 'catIndex', 'catPointIndex'],
  components: {
    SuccesIndicator,
  },
};
</script>

<style></style>
