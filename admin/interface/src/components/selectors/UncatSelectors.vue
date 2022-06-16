<template>
  <div class="uncategorised-selectors">
    <h5>Uncategorised</h5>
    <div
      class="component-class"
      v-for="(cClass, index) in selectorStore.uncatClasses"
      :key="index"
      draggable="true"
      @dragstart="startDrag($event, cClass, cClass.type)"
    >
      <h6>{{ cClass.key }}</h6>
    </div>
    <CustomFolder
      class="component-class"
      v-for="(sClass, index) in selectorStore.uncatStyleSets"
      :folder="sClass"
      :key="index"
      draggable="true"
      @dragstart="startDrag($event, sClass, sClass.type)"
    />
  </div>
</template>

<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'
import CustomFolder from '@/components/selectors/CustomFolder.vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()
/**
 * Drag and Drop
 */
const startDrag = (event, item, type) => {
  if (item.key === 'Uncategorized Custom Selectors') return
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemID', item.key)
  event.dataTransfer.setData('type', type)
}
</script>
<style scoped>
.uncategorised-selectors {
  padding-top: var(--global-space-m);
  overflow-y: auto;
  height: 80%;
}
.uncategorised-selectors h5 {
  text-align: center;
  padding: var(--global-space-s) 0;
}

.style-folder h5 {
  color: var(--color-text);
  text-align: center;
}
</style>
