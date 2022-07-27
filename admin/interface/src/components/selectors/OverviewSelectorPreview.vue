<template>
  <div class="selector-preview selectors">
    <h5 class="noselect">{{ name }}</h5>
    <div class="selector-list">
      <div v-for="(element, index) in view" :key="index">
        <h6
          class="selector-item text-limit noselect"
          ref="selectorRef"
          @click="$emit('info', selectorRef[index].innerHTML)"
        >
          {{ view[index] }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSelectorStore } from '@/store/selectorStore'
import useHorizontalScroll from '@/composables/useHorizontalScroll'
import { ref, computed, onMounted, onUpdated } from 'vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()
const props = defineProps(['view', 'name'])
const selectorRef = ref([])

const { hScroll } = useHorizontalScroll()

onUpdated(() => {
  hScroll('.selector-list')
})
onMounted(() => {
  hScroll('.selector-list')
})

// const selectorsOnly = computed(() => {
//   return selectorStore.selectors.filter((cClass) => cClass.type === 'selector')
// })
// const customSelectorsOnly = computed(() => {
//   return selectorStore.selectors.filter(
//     (cClass) => cClass.type === 'custom-selector'
//   )
// })
/**
 * get friendly name for custom class
 */
// const selectorName = (sel) => {
//   if (sel['friendly_name'] !== undefined) {
//     return sel['friendly_name']
//   } else {
//     return sel.key
//   }
// }
</script>
<style scoped>
.selector-preview {
  grid-area: 1 / 1 / 3 / 2;
  padding: var(--global-space-m);
}
.selector-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: var(--global-space-xs);
  overflow-x: auto;
}
.selector-preview h5 {
  padding: var(--global-space-s) 0 var(--global-space-m) 0;
}
.selector-item {
  padding-right: var(--global-space-m);
  cursor: pointer;
}
.text-limit {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 28ch;
}
</style>
