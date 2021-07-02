<template>
  <svg
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    :color="color"
  >
    <path d="M0 0h24v24H0z" fill="none"></path>
    <!-- eslint-disable -->
    <path
      v-if="status === false"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    ></path>
    <path v-if="status === true" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
    <!-- eslint-enable -->
  </svg>
</template>

<script>
export default {
  name: 'MySvg',

  computed: {
    color() {
      return this.status ? '#629677' : 'red';
    },
  },
  props: {
    status: {
      type: Boolean,
      required: false,
      default: null,
    },
    size: {
      type: Number,
      required: false,
      default: 24,
    },
  },

  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
