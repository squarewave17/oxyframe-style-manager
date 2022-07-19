<template>
  <div class="info panel">
    <h5>Project Info</h5>
    <p>
      All Selectors:
      <span>0</span>
    </p>
    <p>
      Oxygen Selectors:
      <span>0</span>
    </p>
    <p>
      Custom Selectors:
      <span>0</span>
    </p>
    <p>
      Codeblock Selectors:
      <span>0</span>
    </p>
    <p>
      Stylesheet Selectors:
      <span>0</span>
    </p>
    <p>
      Active:
      <span>0</span>
    </p>
    <p>
      Unused:
      <span>0</span>
    </p>
    <p>
      Missing:
      <span>0</span>
    </p>
    <p>
      Disabled:
      <span>0</span>
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  all: {
    type: Number,
    default: 0,
  },
  oxy: {
    type: Number,
    default: 0,
  },
  custom: {
    type: Number,
    default: 0,
  },
  codeblock: {
    type: Number,
    default: 0,
  },
  stylesheet: {
    type: Number,
    default: 0,
  },
})
</script>
<style scoped>
.info {
  padding: var(--global-space-m);
}
.info p {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.info h5 {
  padding: var(--global-space-s) 0 var(--global-space-m) 0;
}
.info p span {
  color: var(--color-text-muted);
}
</style>
