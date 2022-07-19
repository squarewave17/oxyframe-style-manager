<template>
  <div class="overview">
    <OverviewInfoPanel />
    <SelectorInfoPanel :selector="sel" />
    <OverviewSelectorPreview :view="selectorPreview" />
    <!-- <pre>{{ selectorStore.selectors }}</pre> -->
    <FileControlPanel />
  </div>
</template>

<script setup>
const sel = 'code-block-class'
/**
 * import
 */

import FileControlPanel from '@/components/selectors/control-panel/FileControlPanel.vue'
import OverviewSelectorPreview from '@/components/selectors/OverviewSelectorPreview.vue'
import OverviewInfoPanel from '@/components/selectors/OverviewInfoPanel.vue'
import SelectorInfoPanel from '@/components/selectors/SelectorInfoPanel.vue'
import BaseButton from '@/components/inputs/BaseButton.vue'

import { useSelectorStore } from '@/store/selectorStore'
import { ref, computed } from 'vue'

/**
 * stores
 */
const selectorStore = useSelectorStore()

const selectorPreview = ref('')
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
