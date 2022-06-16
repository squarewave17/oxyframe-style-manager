<template>
  <Codemirror
    v-model:value="cssPreview"
    :options="cmOptions"
    placeholder="test placeholder"
  />
</template>
<script setup>
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/mode/css/css'
import 'codemirror/addon/edit/closebrackets'
import '@/assets/css/codemirror-of.css'
import { useSelectorStore } from '@/store/selectorStore'
import { ref, onMounted, onUpdated, watchEffect } from 'vue'
import useCssConstruct from '@/composables/useCssConstruct'
const selectorStore = useSelectorStore()
const { constructCssPreview } = useCssConstruct()
const cssPreview = ref('')

watchEffect(() => {
  cssPreview.value = constructCssPreview(
    selectorStore.selectors[selectorStore.currentClass]
  )
})
const cmOptions = ref({
  mode: 'css', // Language mode
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
  autoCloseBrackets: true,
  readOnly: true,
})
</script>
