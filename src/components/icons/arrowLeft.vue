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
      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0
          01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
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
