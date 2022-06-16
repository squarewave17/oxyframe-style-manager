<template>
  <div class="style-sheet-control-panel panel">
    <div class="control-panel-top">
      <h5
        v-if="
          selectorStore.typeSelected === 'sheet' &&
          selectorStore.SsEmpty !== false
        "
      >
        Stylesheet
      </h5>
      <h5
        v-if="
          selectorStore.typeSelected === 'stylesheet-folder' &&
          selectorStore.SsFoldersEmpty !== false
        "
      >
        Folder
      </h5>
      <!-- style sheet name -->
      <input
        v-if="
          selectorStore.typeSelected === 'sheet' &&
          selectorStore.SsEmpty !== false
        "
        type="text"
        v-model="
          selectorStore.styleSheets[selectorStore.currentStyleSheet].name
        "
      />
      <!-- folder name -->
      <input
        v-if="
          selectorStore.typeSelected === 'stylesheet-folder' &&
          selectorStore.SsFoldersEmpty !== false
        "
        :readonly="uncatSelected"
        type="text"
        v-model="
          selectorStore.styleSheetFolders[selectorStore.currentStyleSheetFolder]
            .name
        "
      />
      <!-- Folder Select -->
      <h5
        v-if="
          selectorStore.typeSelected === 'sheet' &&
          selectorStore.SsEmpty !== false
        "
      >
        Folder
      </h5>
      <BaseSelect
        class="folder-select"
        v-if="
          selectorStore.typeSelected === 'sheet' &&
          selectorStore.SsEmpty !== false
        "
        :options="selectorStore.SsFolderList"
        v-model="
          selectorStore.styleSheets[selectorStore.currentStyleSheet].parent
        "
      />
      <!-- Delete sheet -->
      <BaseButton
        width="full"
        v-if="
          selectorStore.typeSelected === 'sheet' &&
          selectorStore.SsEmpty !== false
        "
        @click="showDeleteSheetPrompt = true"
      >
        <span>Delete Stylesheet</span>
        <IconPreDelete class="icon" />
      </BaseButton>
      <!-- Delete Folder -->
      <BaseButton
        width="full"
        v-if="
          selectorStore.typeSelected === 'stylesheet-folder' &&
          selectorStore.SsFoldersEmpty !== false
        "
        :disabled="uncatSelected"
        @click="showDeleteFolderPrompt = true"
      >
        <span>Delete Folder</span>
        <IconDeleteFolder class="icon" />
      </BaseButton>
      <!-- Disable Folder -->
      <BaseButton
        width="full"
        v-if="
          selectorStore.typeSelected === 'stylesheet-folder' &&
          selectorStore.SsFoldersEmpty !== false
        "
        :selected="isDisabled"
        @click="disableFolderToggle()"
      >
        <span>Disable Folder</span>
        <IconDisableFolder class="icon" />
      </BaseButton>
    </div>
    <div class="control-panel-bottom">
      <BaseButton width="full" @click="showNewSheetPrompt = true">
        <span>Add Stylesheet</span>
        <IconAdd class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showNewFolderPrompt = true">
        <span>Create Folder</span>
        <IconAddFolder class="icon" />
      </BaseButton>
    </div>
    <!-- Overlays -->
    <!-- Add Stylesheet -->
    <div class="overlay-prompt panel" v-if="showNewSheetPrompt">
      <h5>Add Stylesheet</h5>
      <h6>Name</h6>
      <input type="text" v-model="newStylesheetName" />
      <BaseButton
        width="full"
        :disabled="newStylesheetNameValid === false"
        @click="newStylesheet()"
      >
        <span>Add Stylesheet</span>
        <IconAdd class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showNewSheetPrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
    <!-- Add Folder -->
    <div class="overlay-prompt panel" v-if="showNewFolderPrompt">
      <h5>Add Folder</h5>
      <h6>Name</h6>
      <input type="text" v-model="newStylesheetFolderName" />
      <BaseButton
        width="full"
        :disabled="newFolderNameValid === false"
        @click="newStylesheetFolder()"
      >
        <span>Add Folder</span>
        <IconAdd class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showNewFolderPrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
    <!-- Delete Stylesheet -->
    <div class="overlay-prompt panel delete" v-if="showDeleteSheetPrompt">
      <h5>Are you sure?</h5>
      <BaseButton width="full" @click="deleteStylesheet()">
        <span>Delete Stylesheet</span>
        <IconDeleteFolder class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showDeleteSheetPrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
    <!-- Delete Folder -->
    <div class="overlay-prompt panel delete" v-if="showDeleteFolderPrompt">
      <h5>Are you sure?</h5>
      <p>Deleting this folder will also delete all of the stylesheets in it.</p>
      <BaseButton width="full" @click="deleteFolder()">
        <span>Delete Folder</span>
        <IconDeleteFolder class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showDeleteFolderPrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
  </div>
</template>
<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'
import BaseSelect from '@/components/inputs/BaseSelect'
import { computed, toRefs, ref, reactive, onMounted, onUpdated } from 'vue'
// import IconButton from '@/components/inputs/IconButton'
import BaseButton from '@/components/inputs/BaseButton'
// import IconCopy from '@/components/icons/IconCopy'
import IconDelete from '@/components/icons/IconDelete'
import IconPreDelete from '@/components/icons/IconPreDelete'
// import IconLockClosed from '@/components/icons/IconLockClosed'
// import IconLockOpen from '@/components/icons/IconLockOpen'
// import IconQuarantine from '@/components/icons/IconQuarantine'
import IconAdd from '@/components/icons/IconAdd'
import IconDisableFolder from '@/components/icons/IconDisableFolder'
import IconAddFolder from '@/components/icons/IconAddFolder'
import IconDeleteFolder from '@/components/icons/IconDeleteFolder'
import IconClose from '@/components/icons/IconClose'
// import useCssConstruct from '@/use/useCssConstruct'
import useFormatCheck from '@/composables/useFormatCheck'
// const { checkOxyClass } = useFormatCheck()
/**
 * stores
 */
const selectorStore = useSelectorStore()
const { checkOxyFolder } = useFormatCheck()
/**
 * Add new
 */
const showNewSheetPrompt = ref(false)
const newStylesheetName = ref('')
const newStylesheetNameValid = computed(() => {
  if (checkOxyFolder(newStylesheetName.value) === true) {
    return true
  } else {
    return false
  }
})
const newStylesheet = () => {
  selectorStore.newStylesheet(newStylesheetName.value)
  showNewSheetPrompt.value = false
  newStylesheetName.value = ''
}
/**
 * Add Folder
 */
const showNewFolderPrompt = ref(false)
const newStylesheetFolderName = ref('')
const newFolderNameValid = computed(() => {
  if (checkOxyFolder(newStylesheetFolderName.value) === true) {
    return true
  } else {
    return false
  }
})
const newStylesheetFolder = () => {
  selectorStore.newSsFolder(newStylesheetFolderName.value)
  showNewFolderPrompt.value = false
  newStylesheetFolderName.value = ''
}
/**
 * Delete
 */
const showDeleteSheetPrompt = ref(false)
const deleteStylesheet = () => {
  selectorStore.deleteStylesheet()
  showDeleteSheetPrompt.value = false
}
/**
 * Delete Folder
 */
const showDeleteFolderPrompt = ref(false)
const deleteFolder = () => {
  selectorStore.deleteSsFolder()
  showDeleteFolderPrompt.value = false
}
/**
 * Disable
 */
const disableFolderToggle = () => {
  if (
    selectorStore.styleSheetFolders[selectorStore.currentStyleSheetFolder]
      .status === 0
  ) {
    selectorStore.styleSheetFolders[
      selectorStore.currentStyleSheetFolder
    ].status = 1
  } else {
    selectorStore.styleSheetFolders[
      selectorStore.currentStyleSheetFolder
    ].status = 0
  }
}
const isDisabled = computed(() => {
  return selectorStore.isSsFolderDisabled
})

/**
 * Prevent uncategorized folder from deletion
 */
const uncatSelected = computed(() => {
  if (
    selectorStore.styleSheetFolders[selectorStore.currentStyleSheetFolder]
      .name === 'Uncategorized' &&
    selectorStore.typeSelected === 'stylesheet-folder'
  ) {
    return true
  } else {
    return false
  }
})
</script>
<style scoped>
.style-sheet-control-panel {
  position: relative;
  overflow: hidden;
  text-align: center;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 170px);
}
.style-sheet-control-panel h5 {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-m);
}
.style-sheet-control-panel h6 {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-s);
}
.overlay-prompt {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
.overlay-prompt h5 {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-l);
}
.overlay-prompt input {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-l);
}
.overlay-prompt button,
button {
  margin-bottom: var(--global-space-l);
}

input,
.folder-select {
  width: 100%;
  text-align: left;
  margin-bottom: var(--global-space-l);
}
</style>
