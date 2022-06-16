<template>
  <div class="ssf-header" @click="selectSsFolder(folder)">
    <h6>{{ folder.name }}</h6>
  </div>
  <div
    class="ssf-content"
    :class="{
      isDisabled: folder.status === 0,
    }"
    @drop="onDrop($event, folder.id)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div
      v-for="(sheet, index) in selectorStore.SsListFolder(folder.id)"
      :key="index"
      draggable="true"
      class="ssf-sheet"
      :class="{
        isselected:
          sheet.name ===
          selectorStore.styleSheets[selectorStore.currentStyleSheet].name,
      }"
      @dragstart="startDrag($event, sheet, 'sheet')"
      @click="selectSheet(sheet)"
    >
      <h6>{{ sheet.name }}</h6>
    </div>
  </div>
</template>
<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'
import useItemSelect from '@/composables/useItemSelect'
import { ref } from 'vue'

/**
 * stores
 */
const selectorStore = useSelectorStore()
/**
 * composables
 */
const { selectSheet, selectSsFolder } = useItemSelect()
const props = defineProps({
  folder: {
    type: Object,
  },
})

/**
 * Drag and Drop
 */
const startDrag = (event, item, type) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  if (type === 'sheet') {
    console.log('sheet')
  }
  event.dataTransfer.setData('itemID', item.id)
  event.dataTransfer.setData('type', type)
}

const onDrop = (event, folder) => {
  const itemID = event.dataTransfer.getData('itemID')
  const type = event.dataTransfer.getData('type')
  if (type === 'sheet') {
    let targetIndex
    for (var i = 0; i < selectorStore.styleSheets.length; i++) {
      if (selectorStore.styleSheets[i].id == itemID) {
        targetIndex = i
      }
    }
    selectorStore.styleSheets[targetIndex].parent = folder
  }
}
</script>
<style scoped>
.ssf-header {
  text-align: left;
  width: 100%;
  padding: var(--global-space-s);
  background: var(--color-background-panel);
  border-radius: var(--radius-m) var(--radius-m) 0 0;
  border-top: 1px solid var(--color-global-border);
  border-left: 1px solid var(--color-global-border);
  border-right: 1px solid var(--color-global-border);
  cursor: pointer;
}
.ssf-content {
  text-align: left;
  padding: var(--global-space-m);
  margin-bottom: var(--global-space-s);
  border-bottom: 1px solid var(--color-global-border);
  border-left: 1px solid var(--color-global-border);
  border-right: 1px solid var(--color-global-border);
  border-radius: 0 0 var(--radius-m) var(--radius-m);
}
.ssf-content.isDisabled {
  background: repeating-linear-gradient(
    -55deg,
    var(--color-background),
    var(--color-background) 10px,
    var(--color-form-control-alt) 10px,
    var(--color-form-control-alt) 20px
  );
}
.ssf-sheet {
  padding-bottom: var(--global-space-s);
  cursor: pointer;
}
.ssf-sheet.isselected h6 {
  color: var(--color-text-muted);
}
</style>
