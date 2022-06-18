<template>
  <div class="base-select">
    <label v-if="label" class="of-form-label">{{ label }}</label>
    <select class="select" :value="modelValue" @change="updateValue">
      <option value="" disabled selected hidden>
        <span class="placehold">px</span>
      </option>
      <option
        v-for="(option, index) in unitOptions"
        :value="option.value"
        :key="index"
      >
        {{ option.unit }}
      </option>
    </select>
  </div>
</template>

<script setup>
/**
 * imports
 */
import { ref, computed } from 'vue'

/**
 * props
 */
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, Object],
    default: '',
  },
  type: {
    type: String,
    default: 'font-size',
  },
  name: {
    type: String,
    default: '',
  },
})
/**
 * options
 */
const unitOptions = [
  { unit: 'px', value: 'px' },
  { unit: '%', value: '%' },
  { unit: 'em', value: 'em' },
  { unit: 'rem', value: 'rem' },
  { unit: 'vw', value: 'vw' },
  { unit: 'vh', value: 'vh' },
  { unit: 'none', value: ' ' },
]

/**
 * emits
 */
const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
select.select {
  width: 65px;
  box-shadow: none;
  -webkit-appearance: none;
  background: var(--color-background)
    url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23555%22%2F%3E%3C%2Fsvg%3E)
    no-repeat right 5px top 55%;
  background-size: 16px 16px;
  cursor: pointer;
  vertical-align: middle;
}
select.select:active,
select.select:focus {
  border-color: transparent;
  box-shadow: none;
}
</style>
