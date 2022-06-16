<template>
  <Codemirror
    v-if="selectorStore.SsEmpty !== false"
    v-model:value="selectorStore.styleSheets[currentSheet].css"
    :options="cmOptions"
    placeholder="test placeholder"
  />
</template>
<script setup>
/**
 * import
 */
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/mode/css/css'
import 'codemirror/addon/edit/closebrackets'
import '@/assets/css/codemirror-of.css'
import { ref, watchEffect, onMounted } from 'vue'
import { useSelectorStore } from '@/store/selectorStore'
/**
 * stores
 */
const selectorStore = useSelectorStore()

const currentSheet = ref(0)

watchEffect(() => {
  currentSheet.value = selectorStore.currentStyleSheet
})
onMounted(() => {
  selectorStore.typeSelected = 'sheet'
})
const cmOptions = ref({
  mode: 'css', // Language mode
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
  autoCloseBrackets: true,
})
</script>
<style scoped>
.codemirror-container {
  font-size: 15px;
}
</style>
