<template>
  <td
    :comment="catPoint.comment"
    :rep="catPoint.unacceptedInARow"
    @click.alt="changeResult(audit, catIndex, catPointIndex)"
  >
    <SuccesIcon :size="16" :status="catPoint.accepted" />
  </td>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import { toggleResult } from '../services/AuditsService';
import SuccesIcon from './SuccesIcon.vue';

export default {
  props: ['audit', 'catIndex', 'catPointIndex'],
  components: { SuccesIcon },
  computed: {
    catPoint() {
      return this.audit.categories[this.catIndex].categoryPoints[this.catPointIndex];
    },
  },
  methods: {
    changeResult() {
      toggleResult(this.audit._id, this.catPoint.id).then(({ data }) => {
        if (data.success) {
          this.$store.dispatch('getAudits');
        }
      });
    },
  },
};
</script>

<style></style>
