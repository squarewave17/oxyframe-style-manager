<template>
  <div class="selector-control-panel panel">
    <h5>
      <span v-if="isCustom">Custom</span>
      Selector
      <span
        v-if="
          selectorStore.classIsMulti === true &&
          selectorStore.selectorsEmpty === false
        "
      >
        (multi)
      </span>
    </h5>
    <input
      v-if="
        selectorStore.classIsMulti === false &&
        selectorStore.selectorsEmpty === false &&
        selectorStore.typeSelected === 'selector'
      "
      type="text"
      v-model="selectorStore.selectors[selectorStore.currentClass].key"
    />
    <input
      v-if="
        selectorStore.classIsMulti === false &&
        selectorStore.selectorsEmpty === false &&
        selectorStore.typeSelected === 'custom-selector'
      "
      class="friendly-name"
      placeholder="Friendly name"
      type="text"
      v-model="
        selectorStore.selectors[selectorStore.currentClass]['friendly_name']
      "
    />
    <textarea
      v-if="
        selectorStore.classIsMulti === false &&
        selectorStore.selectorsEmpty === false &&
        selectorStore.typeSelected === 'custom-selector'
      "
      v-model="selectorStore.selectors[selectorStore.currentClass].key"
    />
    <BaseSelect
      class="folder-select"
      v-if="
        selectorStore.classIsMulti === false &&
        selectorStore.selectorsEmpty === false &&
        selectorStore.typeSelected === 'selector'
      "
      :options="selectorStore.folderList"
      v-model="selectorStore.selectors[selectorStore.currentClass].parent"
    />
    <BaseSelect
      class="folder-select"
      v-if="
        selectorStore.classIsMulti === true &&
        selectorStore.selectorsEmpty === false &&
        selectorStore.typeSelected === 'selector'
      "
      :options="selectorStore.folderList"
      @change="setFolders($event)"
    />

    <BaseSelect
      class="folder-select"
      v-if="
        selectorStore.classIsMulti === false &&
        selectorStore.selectorsEmpty === false &&
        selectorStore.typeSelected === 'custom-selector'
      "
      :options="selectorStore.styleSetList"
      v-model="selectorStore.selectors[selectorStore.currentClass]['set_name']"
    />
    <BaseSelect
      class="folder-select"
      v-if="
        selectorStore.classIsMulti === true &&
        selectorStore.selectorsEmpty === false &&
        selectorStore.typeSelected === 'custom-selector'
      "
      :options="selectorStore.styleSetList"
      @change="styleSetFolders($event)"
    />

    <div v-if="selectorStore.selectorsEmpty === false" class="icon-buttons">
      <!-- clone button -->
      <BaseIconButton
        class="clone"
        v-if="selectorStore.classIsMulti === false"
        @click="showClonePrompt = true"
      >
        <IconCopy class="icon" />
      </BaseIconButton>
      <!-- Locked BaseButton -->
      <BaseIconButton class="lock" :state="isLocked" @click="lockSelector()">
        <IconLockOpen v-if="selectorStore.isLocked !== 'true'" class="icon" />
        <IconLockClosed v-if="selectorStore.isLocked === 'true'" class="icon" />
      </BaseIconButton>
      <!-- Delete BaseButton -->
      <BaseIconButton class="delete" @click="showDeletePrompt = true">
        <IconPreDelete class="icon" />
      </BaseIconButton>
      <!-- Quarantine BaseButton -->
      <BaseIconButton
        class="quarantine"
        :state="isQuarantined"
        @click="quarantineSelector()"
      >
        <IconQuarantine class="icon" />
      </BaseIconButton>
    </div>
    <div
      v-if="
        selectorStore.classIsMulti === false &&
        selectorStore.selectorsEmpty === false
      "
      class="preview-switch"
    >
      <div
        :class="{ active: previewPanelSwitch === 'css' }"
        @click="preview('css')"
      >
        Css Preview
      </div>
      <div
        :class="{ active: previewPanelSwitch === 'state' }"
        @click="preview('state')"
      >
        State Order
      </div>
    </div>
    <div
      v-if="selectorStore.selectorsEmpty === false"
      class="preview-panel"
      :class="{ preview: previewPanelpad }"
    >
      <component :is="previewPanel"></component>
    </div>
    <BaseButton
      v-if="selectorStore.classIsMulti === false"
      width="full"
      @click="showNewPrompt = true"
    >
      <span>Add Selector</span>
      <IconAdd class="icon" />
    </BaseButton>

    <!-- Clone Selector -->
    <div class="overlay-prompt panel" v-if="showClonePrompt">
      <h5>Clone Selector</h5>
      <p>Selector Name</p>
      <input type="text" v-model="cloneName" />
      <BaseButton
        width="full"
        :disabled="cloneNameValid === false"
        @click="cloneSelector()"
      >
        <span>Clone Selector</span>
        <IconCopy class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showClonePrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
    <!-- Delete Selector -->
    <div class="overlay-prompt panel delete" v-if="showDeletePrompt">
      <h5>Are you sure?</h5>
      <BaseButton width="full" @click="deleteSelector()">
        <span v-if="!selectorStore.classIsMulti">Delete Selector</span>
        <span v-if="selectorStore.classIsMulti">
          Delete {{ selectorStore.currentClass.length }} Selectors
        </span>
        <IconDelete class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showDeletePrompt = false">
        <span>Cancel</span>
        <IconClose class="icon" />
      </BaseButton>
    </div>
    <!-- New Selector -->
    <div class="overlay-prompt panel" v-if="showNewPrompt">
      <h5>New Selector</h5>
      <p>Selector Name</p>
      <input type="text" v-model="newName" />
      <BaseButton
        width="full"
        :disabled="newNameValid === false"
        @click="newSelector()"
      >
        <span>Create Selector</span>
        <IconCopy class="icon" />
      </BaseButton>
      <BaseButton width="full" @click="showNewPrompt = false">
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
import { computed, ref, onMounted, onUpdated } from 'vue'
import BaseIconButton from '@/components/inputs/BaseIconButton'
import BaseButton from '@/components/inputs/BaseButton'
import IconCopy from '@/components/icons/IconCopy'
import IconDelete from '@/components/icons/IconDelete'
import IconPreDelete from '@/components/icons/IconPreDelete'
import IconLockClosed from '@/components/icons/IconLockClosed'
import IconLockOpen from '@/components/icons/IconLockOpen'
import IconQuarantine from '@/components/icons/IconQuarantine'
import IconAdd from '@/components/icons/IconAdd'
import IconClose from '@/components/icons/IconClose'
import StateOrder from '@/components/selectors/StateOrder'
import CssPreview from '@/components/selectors/CssPreview'
import PreviewSelectedList from '@/components/selectors/PreviewSelectedList'
import useCssConstruct from '@/composables/useCssConstruct'
import useFormatCheck from '@/composables/useFormatCheck'
const { checkOxyClass } = useFormatCheck()
/**
 * stores
 */
const selectorStore = useSelectorStore()
const { constructSnippet } = useCssConstruct()

/**
 * refs
 */
const cssPreview = ref('')

const setFolders = (f) => {
  selectorStore.selectedClasses.forEach((x) => {
    selectorStore.selectors[x].parent = f.target.value
  })
}
const styleSetFolders = (f) => {
  selectorStore.selectedClasses.forEach((x) => {
    selectorStore.selectors[x]['set_name'] = f.target.value
  })
}

/**
 * Clone Class
 */

const showClonePrompt = ref(false)
const cloneName = ref('')

const cloneNameValid = computed(() => {
  if (checkOxyClass(cloneName.value) === true) {
    return true
  } else {
    return false
  }
})
const cloneSelector = () => {
  selectorStore.cloneSelector(cloneName.value)
  showClonePrompt.value = false
  cloneName.value = ''
}

/**
 * Delete Class
 */
const showDeletePrompt = ref(false)
const deleteSelector = () => {
  selectorStore.deleteSelector()
  showDeletePrompt.value = false
}

/**
 * Add class
 */
const newName = ref('')
const showNewPrompt = ref(false)
const newNameValid = computed(() => {
  if (checkOxyClass(newName.value) === true) {
    return true
  } else {
    return false
  }
})
const newSelector = () => {
  selectorStore.newSelector(newName.value)
  showNewPrompt.value = false
  newName.value = ''
}

/**
 * locked
 */
const isLocked = computed(() => {
  switch (selectorStore.isLocked) {
    case 'true':
      return 'selected'
    case 'mixed':
      return 'mixed'
    default:
      return ''
  }
})
const lockSelector = () => {
  selectorStore.lockSelector()
}
/**
 * Quarantine
 */
const isQuarantined = computed(() => {
  switch (selectorStore.isQuarantined) {
    case 'true':
      return 'selected'
    case 'mixed':
      return 'mixed'
    default:
      return ''
  }
})
const quarantineSelector = () => {
  selectorStore.quarantineSelector()
}
/**
 * Conditions
 */
const isCustom = computed(() => {
  if (selectorStore.typeSelected === 'custom-selector') {
    return true
  } else {
    return false
  }
})
/**
 * Panel view
 */
const previewPanelSwitch = ref('css')
const previewPanel = computed(() => {
  if (selectorStore.classIsMulti === true) {
    return PreviewSelectedList
  } else {
    if (previewPanelSwitch.value === 'css') {
      return CssPreview
    } else if (previewPanelSwitch.value === 'state') {
      return StateOrder
    }
    return null
  }
})
const preview = (p) => {
  previewPanelSwitch.value = p
}
const previewPanelpad = computed(() => {
  if (
    selectorStore.classIsMulti === true ||
    previewPanelSwitch.value === 'state'
  ) {
    return false
  } else {
    return true
  }
})
</script>
<style scoped>
.selector-control-panel {
  grid-area: 1 / 2 / 2 / 3;
  position: relative;
  overflow: hidden;
  text-align: center;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);
}
.selector-control-panel .friendly-name {
  margin-bottom: var(--global-space-m);
}
.overlay-prompt {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.overlay-prompt h5,
.selector-control-panel h5 {
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

.preview-panel {
  color: var(--color-text);
  width: 100%;
  background-color: var(--color-background);
  border-radius: var(--radius-m);
  padding: var(--global-space-m);
  min-height: 200px;
  /* transition: color 0.5s, background-color 0.5s; */
  margin-bottom: var(--global-space-m);
  text-align: left;
  overflow-y: scroll;
  overflow-x: scroll;
  flex-grow: 1;
}
.preview-panel.preview {
  color: var(--color-text);
  width: 100%;
  background-color: var(--color-background);
  border-radius: var(--radius-m);
  padding: 0;
  min-height: 200px;
  /* transition: color 0.5s, background-color 0.5s; */
  text-align: left;
  overflow-y: hidden;
  overflow-x: hidden;
  margin-bottom: var(--global-space-m);
  flex-grow: 1;
}

.icon-buttons {
  display: flex;
  justify-content: space-between;
  gap: var(--global-space-s);
  margin-bottom: var(--global-space-m);
}

.icon-btn {
  align-items: center;
  position: relative;
  cursor: pointer;
}
.icon-btn:before {
  font-size: 12px;
  position: absolute;
  top: -20px;
  opacity: 0;
  transition: opacity 0.1s ease-in;
}

.icon-btn:hover:before {
  opacity: 1;
}

.icon-btn.clone:before {
  content: 'Clone';
}
.icon-btn.lock:before {
  content: 'Lock';
}
.icon-btn.delete:before {
  content: 'Delete';
}
.icon-btn.quarantine:before {
  content: 'Quarantine';
}
input,
.folder-select {
  width: 100%;
  text-align: left;
  margin-bottom: var(--global-space-l);
}
textarea {
  margin-bottom: var(--global-space-m);
}
.preview-switch {
  display: flex;
  width: 100%;
  margin-bottom: var(--global-space-m);
  border: 1px solid var(--color-global-border);
  border-radius: var(--radius-m);
  user-select: none;
  overflow: hidden;
  min-height: 34px;
}
.preview-switch > div {
  width: 50%;
  text-align: center;
  padding: var(--global-space-s);
  cursor: pointer;
}
.preview-switch > div.active {
  background-color: var(--color-background-active);
  /* color: var(--color-background); */
}
</style>
