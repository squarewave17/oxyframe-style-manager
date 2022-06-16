<template>
  <div class="toggle-switch">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox"
    />
    <div class="knobs">
      <span class="false-label">{{ falseLabel }}</span>
      <span class="true-label">{{ trueLabel }}</span>
    </div>
    <div class="layer"></div>
    <div class="label-container">
      <label>{{ label }}</label>
    </div>
  </div>
</template>

<script setup>
/**
 * props
 */
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
  },
  falseLabel: {
    type: String,
    default: 'True',
  },
  trueLabel: {
    type: String,
    default: 'False',
  },
})
</script>

<style scoped>
input {
  border-radius: 6px;
  border: 1px solid var(--color-text);
}
.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: var(--radius-s);
  border: 1px solid var(--color-form-control-alt);
}
.toggle-switch {
  /* position: relative;
    top: 50%; */
  width: 80px;
  height: 32px;
  /* margin: -20px auto 0 auto;
    overflow: hidden; */
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}
.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  background-color: var(--color-background);
  transition: 0.3s ease all;
  z-index: 1;
  /* transition: background-color 0.5s; */
}
/* toggle-switch 10 */
.toggle-switch .knobs:before,
/* .toggle-switch .knobs:after, */
.toggle-switch .knobs span {
  position: absolute;
  top: 4px;
  width: 35px;
  height: 21px;
  font-size: 9px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 6px 5px;
  border-radius: 2px;
  transition: 0.3s ease all;
}

.toggle-switch .knobs:before {
  content: '';
  left: 4px;
  background-color: var(--color-text);
}

/* .toggle-switch .knobs:after {
  content: '';
  right: 4px;
  color: var(--color-text);
} */

.toggle-switch .knobs span.false-label {
  display: inline-block;
  left: 4px;
  color: var(--color-background);
  z-index: 1;
}
.toggle-switch .knobs span.true-label {
  display: inline-block;
  right: 4px;
  color: var(--color-text);
  z-index: 1;
}

.toggle-switch .checkbox:checked + .knobs span.false-label {
  color: var(--color-text);
}

.toggle-switch .checkbox:checked + .knobs:before {
  left: 38px;
  background-color: var(--color-text);
}

.toggle-switch .checkbox:checked + .knobs span.true-label {
  color: var(--color-background);
}

.toggle-switch .checkbox:checked ~ .layer {
  background-color: var(--color-background);
}

.label-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.toggle-switch label {
  font-size: 12px;
}
</style>
