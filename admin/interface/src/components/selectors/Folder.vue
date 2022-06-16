<template>
  <div
    class="style-folder"
    :class="{
      isdisabled: folder.status === 0,
    }"
    @drop="onDrop($event, folder.key)"
    @dragenter.prevent
    @dragover.prevent
  >
    <h5 class="ssf-header">{{ folder.key }}</h5>
    <div class="style-folder-inner">
      <div
        class="component-class"
        v-for="(cClass, index) in selectorStore.selectorByFolder(folder.key)"
        :key="index"
        draggable="true"
        @dragstart="startDrag($event, cClass, cClass.type)"
      >
        <h6>{{ cClass.key }}</h6>
      </div>
      <div class="custom-folder-inner">
        <CustomFolder
          class="component-class"
          v-for="(sClass, index) in selectorStore.styleSetsByFolder(folder.key)"
          :folder="sClass"
          :key="index"
          draggable="true"
          @dragstart="startDrag($event, sClass, sClass.type)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'
import { toRefs, computed } from 'vue'
import CustomFolder from '@/components/selectors/CustomFolder.vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()
const props = defineProps(['folder'])
/**
 * Drag and Drop
 */
const startDrag = (event, item, type) => {
  if (item.key === 'Uncategorized Custom Selectors') return
  if (type == 'selector' || type == 'style-set') {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemID', item.key)
    event.dataTransfer.setData('type', type)
  }
}

const onDrop = (event, folder) => {
  const itemID = event.dataTransfer.getData('itemID')
  const type = event.dataTransfer.getData('type')
  if (type == 'selector') {
    const findI = (el) => el.key === itemID
    const i = selectorStore.selectors.findIndex(findI)
    selectorStore.selectors[i].parent = folder
  } else if (type == 'style-set') {
    const findI = (el) => el.key === itemID
    const i = selectorStore.styleSets.findIndex(findI)
    selectorStore.styleSets[i].parent = folder
  }
}
</script>
<style scoped>
.style-folder {
  width: 100%;
  height: 100%;
  min-width: 250px;
  background-color: var(--color-background-panel);
  border: 1px solid var(--color-background-panel);
  padding: var(--global-space-m);
  border-radius: var(--radius-m);
  /* overflow-y: hidden; */
}
.ssf-header {
  cursor: pointer;
}
.style-folder h5 {
  padding: var(--global-space-s);
  user-select: none;
}

.style-folder-inner {
  overflow-y: auto;
  height: 85%;
}
.style-folder h5 {
  color: var(--color-text);
  text-align: center;
}
.isselected {
  background-color: var(--color-background-active);
  border: 1px solid var(--color-global-border);
}
.isdisabled {
  background: repeating-linear-gradient(
    -55deg,
    var(--color-background),
    var(--color-background) 10px,
    var(--color-background-soft) 10px,
    var(--color-background-soft) 20px
  );
}
h6 {
  cursor: pointer;
}
</style>
