<template>
  <div class="stylsheet-view">
    <StyleSheetOrder v-if="selectorStore.SsEmpty === true" />
    <div class="editor-toolbar" v-if="selectorStore.SsEmpty === true">
      <h5>
        {{ selectorStore.styleSheets[selectorStore.currentStyleSheet].name }}
      </h5>
    </div>
    <StyleSheetEditor v-if="selectorStore.SsEmpty === true" />
    <StyleSheetMenu />
    <StyleSheetControlPanel />
  </div>
</template>

<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'

import StyleSheetEditor from '@/components/selectors/StyleSheetEditor.vue'
import StyleSheetOrder from '@/components/selectors/StyleSheetOrder.vue'
import StyleSheetMenu from '@/components/selectors/StyleSheetMenu.vue'
import StyleSheetControlPanel from '@/components/selectors/control-panel/StyleSheetControlPanel.vue'

/**
 * stores
 */
const selectorStore = useSelectorStore()
</script>
<style scoped>
/* Layout */
.stylesheet-editor {
  grid-area: 2 / 2 / 3 / 3;
}
.editor-toolbar {
  grid-area: 1 / 2 / 2 / 3;
}
.stylsheet-view {
  height: 100%;
  display: grid;
  grid-template-columns: 0.5fr 3fr 300px 300px;
  grid-template-rows: 45px 1fr;
  gap: var(--global-space-m);
  grid-auto-flow: row;
}
.style-sheet-order {
  grid-area: 1 / 1 / 3 / 2;
}
.style-sheet-menu {
  grid-area: 1 / 3 / 3 / 4;
}
.style-sheet-control-panel {
  grid-area: 1 / 4 / 3 / 5;
}

/*To Move*/
.editor-toolbar {
  padding-top: var(--global-space-m);
}
.editor-toolbar h5 {
  padding: var(--global-space-s);
}
</style>
