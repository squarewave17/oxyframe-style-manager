<template>
  <button class="icon-btn btn" :class="[state, type, size, width]">
    <slot />
  </button>
</template>

<script setup>
/**
 * import
 */
import { ref, toRefs } from 'vue'
/**
 * Button Status
 */
const { selected } = toRefs(props)
const { disabled } = toRefs(props)
/**
 * props
 */
const props = defineProps({
  type: {
    type: String,
  },
  size: {
    type: String,
  },
  width: {
    type: String,
  },
  icon: {
    type: String,
  },
  state: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-button-outline);
  background: var(--color-background-panel);
  border: 1px solid var(--color-button-outline);
  border-radius: var(--radius-m);
  cursor: pointer;
}
.btn.full {
  width: 100%;
}
.btn.big {
  padding: 10px 10px;
}

.btn.primary {
  color: var(--color-button-outline);
  background: var(--color-background);
}
.btn.muted {
  color: var(--color-button-outline);
  background: var(--color-background-panel);
  border: 1px solid var(--color-button-outline);
}
.btn:disabled {
  color: var(--color-button-outline-disabled);
  border: 1px solid var(--color-button-outline-disabled);
}
.btn.selected {
  background-color: var(--color-button-background-selected);
}
.btn.mixed {
  background: linear-gradient(
    45deg,
    var(--color-form-control-alt) 50%,
    var(--color-background-panel) 50%
  );
}
</style>
