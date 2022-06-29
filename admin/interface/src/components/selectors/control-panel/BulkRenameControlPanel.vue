<template>
  <div class="bulk-rename-control-panel panel" ref="panel">
    <h5>Bulk Rename</h5>
    <p>CTRL + Click to add multi-cursors</p>
    <p>Or</p>
    <p>Add a cursor to the start of each line</p>

    <div class="bulk-multi-button"></div>
    <div class="bulk-rename-button"></div>

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
  </div>
</template>
<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
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
import IconCheck from '@/components/icons/IconCheck'
import IconDown from '@/components/icons/IconDown'
import IconEdit from '@/components/icons/IconEdit'
import StateOrder from '@/components/selectors/StateOrder'
import CssPreview from '@/components/selectors/CssPreview'
import PreviewSelectedList from '@/components/selectors/PreviewSelectedList'
import useCssConstruct from '@/composables/useCssConstruct'
import useFormatCheck from '@/composables/useFormatCheck'
import { onClickOutside } from '@vueuse/core'
const { checkOxyClass } = useFormatCheck()
/**
 * stores
 */
const selectorStore = useSelectorStore()
const showDeletePrompt = ref(false)
</script>
<style scoped>
.bulk-rename-control-panel {
  /* grid-area: 1 / 2 / 2 / 3; */
  position: relative;
  overflow: hidden;
  text-align: center;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);
}
.bulk-rename-control-panel .friendly-name {
  margin-bottom: var(--global-space-m);
}
.bulk-rename-control-panel button,
.bulk-multi-button {
  margin-bottom: var(--global-space-l);
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
.bulk-rename-control-panel h5 {
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

.icon-btn,
.edit-icon {
  align-items: center;
  position: relative;
  cursor: pointer;
}
.icon-btn:before,
.edit-icon:before {
  font-size: 12px;
  position: absolute;
  top: -20px;
  opacity: 0;
  transition: opacity 0.1s ease-in;
}

.icon-btn:hover:before,
.edit-icon:hover:before {
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
.edit-icon:before {
  content: 'Edit Classname';
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
.class-name-container {
  text-align: left;
  margin-bottom: var(--global-space-l);
}
.class-name-container h5 {
  margin-bottom: 0;
}
.edit-icon {
  width: 14px;
}

.selector-name {
  display: flex;
  justify-content: space-between;
}
.class-confirm {
  text-align: center;
}
</style>
