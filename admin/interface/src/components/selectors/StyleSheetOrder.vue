<template>
  <div class="style-sheet-order">
    <h5 v-if="selectorStore.SsEmpty !== false">Load Order</h5>
    <draggable
      v-if="selectorStore.SsEmpty !== false"
      class="dragArea"
      v-model="selectorStore.styleSheets"
      :sort="true"
    >
      <div
        class="list-group-item sheet"
        :class="{
          isselected:
            element.name ===
            selectorStore.styleSheets[selectorStore.currentStyleSheet].name,
        }"
        v-for="element in selectorStore.styleSheets"
        :key="element.name"
        :selectorName="element.name"
        @click="selectSheet(element)"
      >
        <p class="text-limit">{{ element.name }}</p>
        <IconUpDown class="icon-s" />
      </div>
    </draggable>
  </div>
</template>
<script>
export default {
  components: {
    draggable: VueDraggableNext,
  },
}
</script>
<script setup>
/**
 * import
 */
import SelectorItem from '@/components/selectors/SelectorItem.vue'
import IconUpDown from '@/components/icons/IconUpDown'
import { useSelectorStore } from '@/store/selectorStore'
import useItemSelect from '@/composables/useItemSelect'
import { VueDraggableNext } from 'vue-draggable-next'
/**
 * stores
 */
const selectorStore = useSelectorStore()
/**
 * composables
 */
const { selectSheet } = useItemSelect()
</script>
<style scoped>
.style-sheet-order {
  overflow-y: auto;
  padding-bottom: var(--global-space-s);
  padding: var(--global-space-m) 0;
  text-align: center;
}
.style-sheet-order h5 {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-m);
}
.list-group-item {
  max-height: 40px;
  margin-bottom: var(--global-space-s);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  border-radius: var(--radius-m);
  border: 1px solid var(--color-global-border);
  background-color: var(--color-background-panel);
}
p {
  font-size: var(--of-font-6);
}
.text-limit {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 16ch;
}
.list-group-item.sheet.isselected {
  border: 1px solid var(--color-global-border);
  background-color: var(--color-background-active);
}
</style>
