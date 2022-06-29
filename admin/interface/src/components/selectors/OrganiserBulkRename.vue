<template>
  <Codemirror
    ref="cmEditor"
    class="bulk-rename"
    v-model:value="newClasses"
    :options="cmOptions"
    placeholder="test placeholder"
    @change="cmChange"
  />
  <Teleport to=".bulk-multi-button">
    <BaseButton width="full" @click="setCursors">
      <span>Set Multi Cursors</span>
      <IconCursorStart class="icon" width="20px" />
    </BaseButton>
  </Teleport>
  <Teleport to=".bulk-rename-button">
    <BaseButton width="full" @click="triggerClassReplace()">
      <span>Rename Selectors</span>
      <IconReplace class="icon" :working="replaceWorking" />
    </BaseButton>
  </Teleport>
  {{ replaceWorking }}
</template>

<script setup>
import { Editor, EditorConfiguration } from 'codemirror'
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/mode/css/css'
import 'codemirror/addon/edit/closebrackets'
import '@/assets/css/codemirror-of.css'
import BaseButton from '@/components/inputs/BaseButton'
import IconCursorStart from '@/components/icons/IconCursorStart'
import IconReplace from '@/components/icons/IconReplace'
import { useSelectorStore } from '@/store/selectorStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
const selectorStore = useSelectorStore()
const oxyJSONStore = useOxyJSONStore()
import { ref, computed, onMounted, onUpdated, watchEffect, nextTick } from 'vue'

const cmEditor = ref(null)
const cminstance = ref(Editor)

/**
 * Initialization
 */
const oldClasses = ref([])
const newClasses = ref('')
const updatedClasses = ref('')
const lengthValid = ref(true)
const replaceWorking = ref(false)

onMounted(() => {
  let sel = []
  let targets = []
  if (selectorStore.selectedClasses.length === 1) {
    //take the value of selectorStore.selectorAmt an make an array of numbers from 0 to the value -1
    targets = Array.from(Array(selectorStore.selectorAmt).keys())
  } else if (selectorStore.selectedClasses.length > 1) {
    targets = selectorStore.selectedClasses
  }
  targets.forEach((oldClass) => {
    sel.push(selectorStore.selectors[oldClass].key)
  })
  oldClasses.value = JSON.parse(JSON.stringify(sel))
  // split olsClasses.value into a string with a line break between each value
  let str = ''
  oldClasses.value.forEach((oldClass, index, arr) => {
    if (index === arr.length - 1) {
      str += oldClass
    } else {
      str += oldClass + '\n'
    }
  })
  newClasses.value = str
  cminstance.value = cmEditor.value.cminstance
})
/**
 * Multi - select
 */
const setCursors = () => {
  for (let i = 1, len = cminstance.value?.lineCount(); i < len; i++) {
    cminstance.value.addSelection({ line: i, ch: 0 })
  }
  cminstance.value.focus()
  console.log(cminstance.value.getLine(0))
  console.log(cminstance.value.lineCount())
  console.log(oldClasses.value.length)
}

/**
 * Compute values when codemirror changes
 */
const cmChange = (cm) => {
  // set lengthValid on change
  if (cminstance.value.lineCount() === oldClasses.value.length) {
    console.log('true')
    lengthValid.value = true
  } else {
    console.log('false')
    lengthValid.value = false
  }
  // set updated classes on change if doc length is valid
  if (lengthValid.value === true) {
    updatedClasses.value = []
    for (let i = 0; i < cminstance.value.lineCount(); i++) {
      updatedClasses.value.push(cminstance.value.getLine(i))
    }
  }
}

/**
 * Compute replace action
 */
const triggerClassReplace = () => {
  replaceWorking.value = true
  setTimeout(() => {
    classReplaceOutput()
    replaceWorking.value = false
  }, 0.1)
}

const classReplaceOutput = () => {
  let updated = updatedClasses.value
  let initial = oldClasses.value
  // compare initial array to updated arrary, if the value is different, put both values into an array [old, new] and push the array to 'replace' array

  for (let i = 0; i < initial.length; i++) {
    if (initial[i] !== updated[i]) {
      oxyJSONStore.replaceClass(initial[i], updated[i])
      selectorStore.selectors[i].key = updated[i]
    }
  }
}

const cmOptions = ref({
  mode: 'css', // Language mode
  lineNumbers: true, // Show line number
  firstLineNumber: 0,
  smartIndent: true, // Smart indent
  indentUnit: 2, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  styleActiveLine: true, // Display the style of the selected row
  autoCloseBrackets: true,
  readOnly: false,
})
</script>
<style scoped>
.bulk-rename {
  font-size: 13px;
  grid-area: 2 / 1 / 3 / 3;
}
</style>
