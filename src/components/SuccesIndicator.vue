<template>
  <td :comment="catPoint.comment" :rep="catPoint.unacceptedInARow">
    <SuccesIcon :size="16" :status="catPoint.accepted" />
  </td>
</template>

<script>
import SuccesIcon from './SuccesIcon.vue';

export default {
  props: ['audit', 'catIndex', 'catPointIndex'],
  components: { SuccesIcon },
  computed: {
    catPoint() {
      return this.audit.categories[this.catIndex].categoryPoints[this.catPointIndex];
    },
  },
};
</script>

<style></style>
