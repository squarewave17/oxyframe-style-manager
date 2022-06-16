<template>
  <div class="overview">
    <div class="info panel">
      <h5 @click="selectorPreview = ''">Project Info</h5>
      <p @click="selectorPreview = 'selectors'">
        Selectors:
        <span>{{ selectorStore.selectorAmt }}</span>
      </p>
      <p @click="selectorPreview = 'custom-selectors'">
        Custom Selectors:
        <span>{{ selectorStore.customSelectorAmt }}</span>
      </p>
      <p @click="selectorPreview = 'active'">
        Active:
        <span>{{ selectorStore.activeSelectors.length }}</span>
      </p>
      <p @click="selectorPreview = 'unused'">
        Unused:
        <span>{{ selectorStore.unusedClasses.length }}</span>
      </p>
      <p @click="selectorPreview = 'missing'">
        Missing:
        <span>{{ selectorStore.missingClasses.length }}</span>
      </p>
      <p @click="selectorPreview = 'inactive'">
        Inactive:
        <span>{{ selectorStore.inactiveSelectors.length }}</span>
      </p>
      <p>
        Stylesheets:
        <span>{{ selectorStore.styleSheets.length }}</span>
      </p>
    </div>
    <div class="options panel">
      <h5>Project Cleanup</h5>
      <BaseButton width="full" @click="selectorStore.quarantineUnused()">
        Quarantine Unused
      </BaseButton>
      <BaseButton width="full" @click="selectorStore.deleteInactive()">
        Delete Inactive
      </BaseButton>
    </div>
    <OverviewSelectorPreview :view="selectorPreview" />
    <!-- <pre>{{ selectorStore.selectors }}</pre> -->
    <FileControlPanel />
  </div>
</template>

<script setup>
/**
 * import
 */

import FileControlPanel from '@/components/selectors/control-panel/FileControlPanel.vue'
import OverviewSelectorPreview from '@/components/selectors/OverviewSelectorPreview.vue'
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
  grid-template-rows: 1fr 2fr;
  gap: var(--global-space-m);
  grid-auto-flow: row;
}

.info {
  grid-area: 1 / 2 / 2 / 3;
  padding: var(--global-space-m);
}
.info p {
  cursor: pointer;
}
.info h5 {
  padding: var(--global-space-s) 0 var(--global-space-m) 0;
}
.info p span {
  color: var(--color-text-muted);
}

.options {
  grid-area: 2 / 2 / 3 / 3;
  padding: var(--global-space-m);
}
.options h5 {
  padding: var(--global-space-s) 0 var(--global-space-m) 0;
}
.options button {
  margin: var(--global-space-m) 0;
}
.file-control-panel {
  grid-area: 1 / 3 / 3 / 4;
}
</style>
