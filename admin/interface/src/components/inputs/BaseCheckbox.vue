<template>
  <div class="form-control">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      v-bind="$attrs"
    />
    <label v-if="label" class="">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style scoped>
.form-control {
  text-align: left;
}
input[type='checkbox'] {
  background: var(--color-background-panel);
  position: relative;
  border-radius: var(--radius-s);
}
input[type='checkbox']:focus {
  border-color: var(--color-text);
  box-shadow: none;
  outline: 2px solid transparent;
}
input[type='checkbox']:checked::before {
  position: absolute;
  content: '';
  background: var(--color-text);
  border-radius: 2px;
  height: 8px;
  width: 8px;
  bottom: 50%;
  right: 50%;
  transform: translate(50%, 50%);
}
</style>
