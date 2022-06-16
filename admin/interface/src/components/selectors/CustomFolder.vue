<template>
  <div>
    <div
      class="custom-folder-inner"
      :class="{
        isSelected:
          thisIndex === selectorStore.currentStyleSet &&
          selectorStore.typeSelected === 'style-set',
      }"
      @drop="onDrop($event, folder.key)"
      @click="selectStyleSet(folder.key)"
      @dragenter.prevent
      @dragover.prevent
    >
      <h6 class="custom-folder-header">
        {{ folder.key }}
      </h6>
      <div
        class="custom-selector"
        v-for="(cSel, index) in selectorStore.selectorByStyleSet(folder.key)"
        :key="index"
        draggable="true"
        @dragstart="startDrag($event, cSel, cSel.type)"
      >
        <h6>{{ customSelector(cSel) }}</h6>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSelectorStore } from '@/store/selectorStore'
import { ref } from 'vue'
const selectorStore = useSelectorStore()
const props = defineProps(['folder'])

const thisIndex = ref(null)
/**
 * Set select
 */
const selectStyleSet = (set) => {
  event.stopPropagation()
  let targetI
  for (var i = 0; i < selectorStore.styleSets.length; i++) {
    if (selectorStore.styleSets[i].key === set) {
      targetI = i
    }
  }
  selectorStore.currentStyleSet = targetI
  thisIndex.value = targetI
  selectorStore.typeSelected = 'style-set'
}
/**
 * Drag and Drop
 */
const startDrag = (event, item, type) => {
  event.stopPropagation()
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemID', item.key)
  event.dataTransfer.setData('type', type)
}

const onDrop = (event, folder) => {
  const itemID = event.dataTransfer.getData('itemID')
  const type = event.dataTransfer.getData('type')
  if (type == 'custom-selector') {
    const findI = (el) => el.key === itemID
    const i = selectorStore.selectors.findIndex(findI)
    selectorStore.selectors[i]['set_name'] = folder
  }
}
/**
 * get friendly name for custom class
 */
const customSelector = (sel) => {
  if (sel['friendly_name'] !== undefined) {
    return sel['friendly_name']
  } else {
    return sel.key
  }
}
</script>
<style scoped>
h6 {
  margin: 0;
  cursor: pointer;
}
.custom-folder-header {
  font-size: var(--of-font-6);
  text-align: center;
  margin-bottom: var(--global-space-s);
  padding: var(--global-space-s);
  border-bottom: 1px solid var(--color-global-border);
}
.custom-folder-inner {
  margin-top: var(--global-space-m);
  padding: 0 var(--global-space-m) var(--global-space-m) var(--global-space-m);
  border: 1px solid var(--color-global-border);
}
.custom-folder-inner.isSelected {
  /* background: var(--color-form-control-alt); */
  border: 1px solid var(--color-text-muted);
}
.custom-folder-inner {
  padding-bottom: var(--global-space-s);
  border-radius: var(--radius-m);
}
.custom-folder {
}
</style>
