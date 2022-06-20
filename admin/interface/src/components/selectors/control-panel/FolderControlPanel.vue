<template>
  <div class="folder-control-panel panel">
    <h5>{{ folderType }}</h5>
    <!-- Folder -->
    <input
      v-if="
        selectorStore.foldersEmpty !== false &&
        selectorStore.typeSelected === 'folder'
      "
      type="text"
      :readonly="uncatSelected"
      v-model="selectorStore.styleFolders[selectorStore.currentFolder].key"
      @input="updateChildren()"
    />
    <!-- Style set -->
    <input
      :readonly="uncatSelected"
      v-if="
        selectorStore.foldersEmpty !== false &&
        selectorStore.typeSelected === 'style-set'
      "
      type="text"
      v-model="selectorStore.styleSets[selectorStore.currentStyleSet].key"
      @input="updateChildren()"
    />
    <BaseSelect
      class="folder-select"
      v-if="
        selectorStore.styleSets[selectorStore.currentStyleSet].key !==
          'Uncategorized Custom Selectors' &&
        selectorStore.typeSelected === 'style-set'
      "
      :options="selectorStore.folderList"
      v-model="selectorStore.styleSets[selectorStore.currentStyleSet].parent"
    />
    <BaseButton width="full" @click="showNewFolderPrompt = true">
      <span>Create Folder</span>
      <IconAddFolder class="icon" />
    </BaseButton>
    <BaseButton
      width="full"
      v-if="
        selectorStore.foldersEmpty !== false &&
        selectorStore.typeSelected === 'folder' &&
        selectorStore.styleFolders[selectorStore.currentFolder].key !==
          'Quarantine'
      "
      :selected="isDisabled"
      @click="disableToggle()"
    >
      <span>Disable Folder</span>
      <IconDisableFolder class="icon" />
    </BaseButton>
    <BaseButton
      width="full"
      v-if="
        selectorStore.foldersEmpty !== false &&
        selectorStore.typeSelected === 'folder' &&
        selectorStore.styleFolders[selectorStore.currentFolder].key ===
          'Quarantine'
      "
      @click="showUnquarantinePrompt = true"
    >
      <span>Un-quarantine Folder</span>
      <IconDisableFolder class="icon" />
    </BaseButton>
    <BaseButton
      width="full"
      v-if="selectorStore.foldersEmpty !== false"
      :disabled="uncatSelected"
      @click="showDeleteFolderPrompt = true"
    >
      <span>Delete {{ folderType }}</span>
      <IconDeleteFolder class="icon" />
    </BaseButton>
    <!-- Import Folder -->
    <BaseButton
      width="full"
      v-if="globalStore.fileAccess"
      @click="importFolder()"
    >
      <span>Import Folder</span>
      <IconUpload class="icon" />
    </BaseButton>
    <BaseFileInput
      class="file-input"
      width="full"
      v-else
      @change="importFF"
      ref="importFolderFF"
    >
      <span>Import Folder</span>
      <IconUpload class="icon" />
    </BaseFileInput>
    <!-- Export Folder -->
    <BaseButton
      width="full"
      v-if="globalStore.fileAccess"
      @click="exportFolder()"
    >
      <span>Export Folder</span>
      <IconDownload class="icon" />
    </BaseButton>
    <BaseButton width="full" v-else @click="showExportPanel = true">
      <span>Export Folder</span>
      <IconDownload class="icon" />
    </BaseButton>

    <!-- New Folder -->
    <div class="overlay-prompt panel" v-if="showNewFolderPrompt">
      <h5>New {{ folderCpTitle }}</h5>
      <input type="text" v-model="newFolderName" />

      <BaseButton
        width="full"
        :disabled="newFolderNameValid === false"
        @click="newFolder()"
      >
        <span>Add {{ folderCpTitle }}</span>
        <IconAdd class="icon" />
      </BaseButton>

      <BaseButton width="full" @click="showNewFolderPrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
      <BaseCheckbox :label="'Style set'" v-model="newStyleSet" />
    </div>

    <!-- Delete Folder -->
    <div class="overlay-prompt panel delete" v-if="showDeleteFolderPrompt">
      <h5>Are you sure?</h5>
      <p>Deleting this folder will also delete all of the selectors in it.</p>
      <BaseButton width="full" @click="deleteFolder()">
        <span>Delete {{ folderType }}</span>
        <IconDelete class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showDeleteFolderPrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
    <!-- Unquarantine -->
    <div
      class="overlay-prompt panel unquarantine"
      v-if="showUnquarantinePrompt"
    >
      <h5>Un-Quarantine?</h5>
      <p>Restore all Quarantined selectors?</p>
      <BaseButton width="full" @click="unQuarantine()">
        <span>Un-Quarantine</span>
        <IconReplace class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showUnquarantinePrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
    <!-- Export Overlay -->
    <div class="overlay-prompt panel" v-if="showExportPanel">
      <h5>Export Folder</h5>
      <input type="text" placeholder="Filename" v-model="exportName" />

      <BaseButton
        width="full"
        :disabled="exportName === ''"
        @click="exportFolderFF"
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
import { useSelectorStore } from '@/store/selectorStore'
import { useGlobalStore } from '@/store/globalStore'
import BaseButton from '@/components/inputs/BaseButton'
import BaseFileInput from '@/components/inputs/BaseFileInput'
import BaseSelect from '@/components/inputs/BaseSelect'
import BaseCheckbox from '@/components/inputs/BaseCheckbox'
import IconUpdateFolder from '@/components/icons/IconUpdateFolder'
import IconDeleteFolder from '@/components/icons/IconDeleteFolder'
import IconDelete from '@/components/icons/IconDelete'
import IconClose from '@/components/icons/IconClose'
import IconDisableFolder from '@/components/icons/IconDisableFolder'
import IconAddFolder from '@/components/icons/IconAddFolder'
import IconAdd from '@/components/icons/IconAdd'
import IconUpload from '@/components/icons/IconUpload'
import IconDownload from '@/components/icons/IconDownload'
import IconReplace from '@/components/icons/IconReplace'
import useFormatCheck from '@/composables/useFormatCheck'
import { watch, computed, ref, toRefs, nextTick, reactive } from 'vue'
import IconQuarantine from '@/components/icons/IconQuarantine.vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()
const globalStore = useGlobalStore()
/**
 * Use
 */
const { checkOxyFolder } = useFormatCheck()
/**
 * Computed
 */
const isDisabled = computed(() => {
  if (selectorStore.styleFolders[selectorStore.currentFolder].status !== 1) {
    return true
  } else {
    return false
  }
})
const uncatSelected = computed(() => {
  //Prevent uncategorized from deletion
  if (
    (selectorStore.styleFolders[selectorStore.currentFolder].key ===
      'Uncategorized' &&
      selectorStore.typeSelected === 'folder') ||
    (selectorStore.styleSets[selectorStore.currentStyleSet].key ===
      'Uncategorized Custom Selectors' &&
      selectorStore.typeSelected === 'style-set')
  ) {
    return true
  } else {
    return false
  }
})
const folderCpTitle = computed(() => {
  if (newStyleSet.value === true) {
    return 'Style Set'
  } else {
    return 'Folder'
  }
})
const folderType = computed(() => {
  if (selectorStore.typeSelected === 'style-set') {
    return 'Style Set'
  } else {
    return 'Folder'
  }
})
/**
/**
 * keep folder name and contents in sync
 */
const childFix = reactive({
  fold: '',
  fnew: '',
  sold: '',
  snew: '',
})
const updateChildren = () => {
  if (selectorStore.typeSelected === 'folder') {
    selectorStore.selectorByFolder(childFix.fold).forEach((element) => {
      element.parent = childFix.fnew
    })
    selectorStore.styleSetsByFolder(childFix.fold).forEach((element) => {
      element.parent = childFix.fnew
    })
  } else if (selectorStore.typeSelected === 'style-set') {
    selectorStore.selectorByStyleSet(childFix.sold).forEach((element) => {
      element['set_name'] = childFix.snew
    })
  }
}
const folderName = computed(() => {
  return selectorStore.styleFolders[selectorStore.currentFolder].key
})
const styleSetName = computed(() => {
  return selectorStore.styleSets[selectorStore.currentStyleSet].key
})

watch(folderName, (newValue, oldValue) => {
  childFix.fnew = newValue
  childFix.fold = oldValue
})
watch(styleSetName, (newValue, oldValue) => {
  childFix.snew = newValue
  childFix.sold = oldValue
})
/**
 * Add Folder
 */
const newFolderName = ref('')
const showNewFolderPrompt = ref(false)
const newFolderNameValid = computed(() => {
  if (newStyleSet.value === false) {
    //Check Folder Name
    if (checkOxyFolder(newFolderName.value) === true) {
      return true
    } else {
      return false
    }
  } else {
    //Check StyleSet Name
    if (newFolderName.value !== '') {
      return true
    } else {
      return false
    }
  }
})
const newFolder = () => {
  if (newStyleSet.value === false) {
    //New Folder
    selectorStore.newFolder(newFolderName.value)
    showNewFolderPrompt.value = false
    newFolderName.value = ''
  } else {
    //New style set
    selectorStore.newStyleSet(newFolderName.value)
    showNewFolderPrompt.value = false
    newFolderName.value = ''
  }
}
const newStyleSet = ref(false)
/**
 * Delete Folder
 */
const showDeleteFolderPrompt = ref(false)
const deleteFolder = () => {
  if (selectorStore.typeSelected === 'folder') {
    selectorStore.deleteFolder()
  } else if (selectorStore.typeSelected === 'style-set') {
    selectorStore.deleteStyleSet()
  }
  showDeleteFolderPrompt.value = false
}
/**
 * Unquarantine Folder
 */
const showUnquarantinePrompt = ref(false)
const unQuarantine = () => {
  selectorStore.unQuarantineSelectors()
  showUnquarantinePrompt.value = false
}
/**
 * Disable Folder
 */
const disableToggle = () => {
  if (selectorStore.styleFolders[selectorStore.currentFolder].status === 0) {
    selectorStore.styleFolders[selectorStore.currentFolder].status = 1
  } else {
    selectorStore.styleFolders[selectorStore.currentFolder].status = 0
  }
}

/**
 * Import folder
 */
const importFolder = () => {
  selectorStore.mergeFile()
}
const importFolderFF = ref(null)
const importFF = (e) => {
  var files = e.target.files || e.dataTransfer.files
  let file = files[0]
  if (file.type === 'application/json') {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      selectorStore.mergeFile(reader.result)
    }
    importFolderFF.value.value = null
  } else {
    importFolderFF.value.value = null
    alert('Wrong File Type')
  }
}
/**
 * Export Folder
 */
const exportFolder = () => {
  selectorStore.saveFolder()
}

const showExportPanel = ref(false)
const exportName = ref('')
const exportFolderFF = () => {
  selectorStore.saveFolder(exportName.value)
  showExportPanel.value = false
}
</script>
<style scoped>
.folder-control-panel {
  position: relative;
  overflow: hidden;
  text-align: center;
}
.folder-control-panel input,
.folder-select {
  width: 100%;
  margin-bottom: var(--global-space-l);
}
.folder-control-panel button,
.file-input {
  margin-bottom: var(--global-space-l);
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
.folder-control-panel h5 {
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
.temp-css {
  color: var(--color-text);
  width: 100%;
  background-color: var(--color-background);
  border-radius: var(--radius-m);
  padding: var(--global-space-m);
  min-height: 200px;
}
</style>
