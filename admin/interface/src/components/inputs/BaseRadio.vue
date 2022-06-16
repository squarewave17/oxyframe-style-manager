<template>
  <div class="form-control">
    <input
      type="radio"
      :value="value"
      @change="$emit('update:modelValue', value)"
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
      type: [String, Number],
      default: '',
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
}
</script>

<style>
.form-control {
  display: flex;
  justify-content: center;
  align-items: center;
}
input[type='radio'] {
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--color-background);
  margin: 0;
  font: inherit;
  color: var(--color-form-control-alt);
  width: 1.15em;
  height: 1.15em;
  border: 1px solid var(--color-form-control-alt);
  border-radius: var(--radius-s);
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  box-shadow: unset;
  /* transition: color 0.5s, background-color 0.5s; */
}
.form-control + .form-control {
  margin-top: 1em;
}
.form-control:focus-within {
  color: var(--color-form-control-alt);
}
input[type='radio']::before {
  content: '';

  /* border-radius: var(--radius-s); */
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--color-form-control-alt);
  background-color: var(--color-form-control-alt);
  border-radius: var(--radius-s);
  box-shadow: unset;
  /* transition: color 0.5s, background-color 0.5s; */
}
input[type='radio']:checked::before {
  border-radius: var(--radius-s);
  background-color: var(--color-form-control);
  display: inline-block;
  vertical-align: middle;
  width: 0.65em;
  height: 0.65em;
  margin: 0;
  transform: scale(1);
  box-shadow: none;
}
input[type='radio']:focus {
  outline: none;
  border-color: unset;
  box-shadow: none;
}
</style>
