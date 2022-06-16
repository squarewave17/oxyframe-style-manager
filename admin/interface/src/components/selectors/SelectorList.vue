<template>
  <draggable
    class="dragArea selector-list"
    v-model="selectorStore.selectors"
    :sort="true"
    :disabled="selectorStore.classIsMulti"
    @end="updateCurrentClass($event.newIndex)"
  >
    <SelectorItem
      class="list-group-item"
      v-for="(element, index) in selectorStore.selectors"
      :key="element.key"
      :selectorName="selectorName(element)"
      :selectorIndex="index"
      @click.exact="updateCurrentClass(index, element)"
      @click.ctrl="updateCurrentClassMulti(index, element)"
    />
  </draggable>
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
import { useSelectorStore } from '@/store/selectorStore'
import { VueDraggableNext } from 'vue-draggable-next'
import useSelectorHelpers from '@/composables/useSelectorHelpers'
import useHorizontalScroll from '@/composables/useHorizontalScroll'
import { onMounted } from 'vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()
const { checkOrder } = useSelectorHelpers()
/**
 * Horizontal
 */
const { hScroll } = useHorizontalScroll()

onMounted(() => {
  hScroll('.selector-list')
})
/**
 * Update currentClass on click and move
 */
const updateCurrentClass = (i, e) => {
  selectorStore.currentClass = [i]
  if (e) {
    selectorStore.typeSelected = e.type
  }
  checkOrder()
}
/**
 * Add or remove current class to the array
 */
const updateCurrentClassMulti = (i, e) => {
  if (e.type === selectorStore.typeSelected)
    if (selectorStore.currentClass.indexOf(i) !== -1) {
      const t = selectorStore.currentClass.indexOf(i)
      if (t > -1 && selectorStore.classIsMulti) {
        selectorStore.currentClass.splice(t, 1)
      }
    } else {
      selectorStore.currentClass.push(i)
    }
}
/**
 * get friendly name for custom class
 */
const selectorName = (sel) => {
  if (sel['friendly_name'] !== undefined) {
    if (sel['friendly_name'] !== '') {
      return sel['friendly_name']
    } else {
      return sel.key
    }
  } else {
    return sel.key
  }
}
</script>
<style scoped>
.selector-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: var(--global-space-xs);
  overflow-x: auto;
}
</style>
