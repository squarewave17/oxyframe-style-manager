<template>
  <label class="btn">
    <input
      type="file"
      accept="application/json"
      :disabled="disabled"
      :class="[{ selected: selected }, type, size, width]"
    />
    <slot />
  </label>
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
    //[primary, muted]
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
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped>
.btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-button-outline);
  background: var(--color-background-panel);
  border: 1px solid var(--color-button-outline);
  padding: var(--global-space-s) var(--global-space-m);
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
  background: var(--color-background-primary);
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
label > svg {
  padding: 4px;
}
input {
  position: absolute;
  opacity: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
