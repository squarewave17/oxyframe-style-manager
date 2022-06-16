<template>
  <div class="base-input">
    <input
      :type="type"
      v-bind="$attrs"
      :class="classes"
      :value="modelValue"
      :label="label"
      :readonly="readonly"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label v-if="label">{{ label }}</label>
  </div>
</template>

<script setup>
/**
 * props
 */
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  classes: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  font-size: 12px;
}
</style>
