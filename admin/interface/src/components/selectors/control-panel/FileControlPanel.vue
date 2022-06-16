<template>
  <div class="file-control-panel panel">
    <h5>File Management</h5>
    <div class="panel-controls">
      <div class="import-section">
        <p>Import selectors from a file on your machine</p>
        <BaseButton
          width="full"
          v-if="globalStore.fileAccess"
          @click="selectorStore.loadFile()"
        >
          <span>Import Selectors</span>
          <IconUpload class="icon" />
        </BaseButton>
        <BaseFileInput width="full" v-else @change="loadFile" ref="loadInput">
          <span>Import Selectors</span>
          <IconUpload class="icon" />
        </BaseFileInput>
      </div>
      <div class="import-section">
        <p>Export selectors to a file on your machine</p>
        <BaseButton
          width="full"
          v-if="globalStore.fileAccess"
          @click="selectorStore.saveFile()"
        >
          <span>Export Selectors</span>
          <IconDownload class="icon" />
        </BaseButton>
        <BaseButton width="full" v-else @click="showExportPanel = true">
          <span>Export Selectors</span>
          <IconDownload class="icon" />
        </BaseButton>
      </div>
      <div class="import-section">
        <p>
          Import selectors and merge them with the current selectors. If a
          duplicate selector is found, the original selector will be kept
        </p>
        <BaseButton
          width="full"
          v-if="globalStore.fileAccess"
          @click="selectorStore.mergeFile()"
        >
          <span>Merge Selectors</span>
          <IconMerge class="icon" />
        </BaseButton>

        <BaseFileInput width="full" ref="mergeInput" v-else @change="mergeFile">
          <span>Merge Selectors</span>
          <IconMerge class="icon" />
        </BaseFileInput>
      </div>
    </div>
    <!-- Export Overlay -->
    <div class="overlay-prompt panel" v-if="showExportPanel">
      <h5>Export Selectors</h5>
      <input type="text" placeholder="Filename" v-model="exportName" />

      <BaseButton
        width="full"
        :disabled="exportName === ''"
        @click="exportSelectors"
      >
        <span>Export</span>
        <IconDownload class="icon" />
      </BaseButton>

      <BaseButton width="full" @click="showExportPanel = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
  </div>
</template>
<script setup>
/**
 *import
 * */
import BaseButton from '@/components/inputs/BaseButton'
import BaseFileInput from '@/components/inputs/BaseFileInput'
import IconDownload from '@/components/icons/IconDownload'
import IconUpload from '@/components/icons/IconUpload'
import IconMerge from '@/components/icons/IconMerge'
import IconClose from '@/components/icons/IconClose'
import useCssConstruct from '@/composables/useCssConstruct'
import { ref, watch } from 'vue'
import { useSelectorStore } from '@/store/selectorStore'
import { useGlobalStore } from '@/store/globalStore'

/**
 * stores
 */
const selectorStore = useSelectorStore()
const globalStore = useGlobalStore()

const { constructSnippet } = useCssConstruct()
/**
 * Load FIle
 */
const loadInput = ref(null)
const loadFile = (e) => {
  var files = e.target.files || e.dataTransfer.files
  let file = files[0]
  if (file.type === 'application/json') {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      selectorStore.loadFile(reader.result)
    }
    loadInput.value.value = null
  } else {
    loadInput.value.value = null
    alert('Wrong File Type')
  }
}
/**
 * Merge File
 */
const mergeInput = ref(null)
const mergeFile = (e) => {
  var files = e.target.files || e.dataTransfer.files
  let file = files[0]
  console.log(file.type)
  if (file.type === 'application/json') {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      selectorStore.mergeFile(reader.result)
    }
    mergeInput.value.value = null
  } else {
    mergeInput.value.value = null
    alert('Wrong File Type')
  }
}
/**
 * Export File
 */
const showExportPanel = ref(false)
const exportName = ref('')
const exportSelectors = () => {
  selectorStore.saveFile(exportName.value)
  showExportPanel.value = false
}
</script>
<style scoped>
.file-control-panel {
  position: relative;
  overflow: hidden;
  text-align: center;
}
.file-control-panel h5 {
  padding: var(--global-space-s);
}
.file-control-panel input {
  width: 100%;
  margin-bottom: var(--global-space-l);
}
.import-section {
  padding: var(--global-space-m) 0;
}
.import-section p {
  padding: var(--global-space-s) 0;
}
.overlay-prompt {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
.overlay-prompt h5,
.file-control-panel h5 {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-l);
}
.overlay-prompt input {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-l);
}
.overlay-prompt button {
  margin-bottom: var(--global-space-l);
}
</style>
