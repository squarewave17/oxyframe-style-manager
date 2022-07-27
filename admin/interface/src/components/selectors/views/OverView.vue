<template>
  <div class="overview">
    <OverviewInfoPanel @changeData="selectorView" />
    <SelectorInfoPanel :selector="sel" />
    <OverviewSelectorPreview
      :view="selectorList"
      :name="selName"
      @info="setInfo"
    />
    <!-- <pre>{{ selectorStore.selectors }}</pre> -->
    <FileControlPanel />
  </div>
</template>

<script setup>
const sel = ref('')

const setInfo = (l) => {
  sel.value = l
}

/**
 * import
 */

import FileControlPanel from '@/components/selectors/control-panel/FileControlPanel.vue'
import OverviewSelectorPreview from '@/components/selectors/OverviewSelectorPreview.vue'
import OverviewInfoPanel from '@/components/selectors/OverviewInfoPanel.vue'
import SelectorInfoPanel from '@/components/selectors/SelectorInfoPanel.vue'
import BaseButton from '@/components/inputs/BaseButton.vue'

import { useSelectorStore } from '@/store/selectorStore'
import { ref, reactive, computed, onMounted } from 'vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()

const selName = ref('All Selectors')
const selectorView = (n) => {
  selectedSelectors.value = n.data
  selName.value = n.name
}
const selectedSelectors = ref('')

const selectorList = computed(() => {
  if (selectedSelectors.value !== '') {
    return selectedSelectors.value
  } else {
    return selectorStore.allClasses
  }
})

// const selectorPreview = ref('all')
</script>

<style scoped>
/* Layout */
.overview {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 300px 300px;
  grid-template-rows: 1fr 1fr;
  gap: var(--global-space-m);
  grid-auto-flow: row;
}

.info {
  grid-area: 1 / 2 / 2 / 3;
}

.selector-info {
  grid-area: 2 / 2 / 3 / 3;
}

.file-control-panel {
  grid-area: 1 / 3 / 3 / 4;
}
</style>
