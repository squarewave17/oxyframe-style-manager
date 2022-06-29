<template>
  <svg
    viewBox="12 12 24.5 24"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ height: height, width: width }"
  >
    <path
      d="M12 36V12h3v24Zm22.35-.15-11.7-11.7 11.7-11.7 2.15 2.15-9.55 9.55 9.55 9.55Z"
    />
  </svg>
</template>
<script setup>
defineProps({
  width: {
    type: String,
    default: '24px',
  },
  height: {
    type: String,
    default: '24px',
  },
})
</script>
<style scoped>
svg {
  fill: currentColor;
}
</style>
