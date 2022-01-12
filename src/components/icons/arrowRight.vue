<template>
  <svg
    :width="`${size}px`"
    :height="`${size}px`"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    color="#000000"
  >
    <path
      fill-rule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0
          011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clip-rule="evenodd"
    ></path>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 32,
    },
  },
};
</script>
