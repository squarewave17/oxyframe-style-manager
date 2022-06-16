<template>
  <div
    v-if="
      selectorStore.SsEmpty !== false || selectorStore.SsFoldersEmpty !== false
    "
    class="style-sheet-menu"
  >
    <h5>Stylesheets</h5>
    <draggable
      class="dragArea"
      v-model="selectorStore.styleSheetFolders"
      :sort="true"
      handle=".ssf-header"
    >
      <div
        class="list-group-item"
        v-for="(element, index) in selectorStore.styleSheetFolders"
        :key="index"
      >
        <StyleSheetFolder :folder="element" />
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
import { useSelectorStore } from '@/store/selectorStore'
import { VueDraggableNext } from 'vue-draggable-next'
import StyleSheetFolder from '@/components/selectors/StyleSheetFolder'
/**
 * stores
 */
const selectorStore = useSelectorStore()
</script>
<style scoped>
.style-sheet-menu {
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  padding: var(--global-space-m) 0;
  border-radius: var(--radius-m);
  border: 1px var(--color-background-panel);
  overflow-y: auto;
  text-align: center;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.style-sheet-menu h5 {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-m);
}
.list-group-item {
  /* border: 1px solid white; */
}
</style>
