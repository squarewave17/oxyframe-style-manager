<template>
  <draggable
    class="dragArea folder-list"
    v-model="selectorStore.styleFolders"
    :sort="true"
    handle=".ssf-header"
  >
    <div
      class="list-group-item"
      v-for="(element, index) in selectorStore.styleFolders"
      :key="index"
    >
      <Folder
        :class="{
          isselected:
            index === selectorStore.currentFolder &&
            selectorStore.typeSelected === 'folder',
        }"
        :folder="element"
        @click="updateCurrentFolder(index)"
      />
    </div>
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
import { useSelectorStore } from '@/store/selectorStore'
import { VueDraggableNext } from 'vue-draggable-next'
import Folder from '@/components/selectors/Folder.vue'

/**
 * stores
 */
const selectorStore = useSelectorStore()

const updateCurrentFolder = (i) => {
  selectorStore.currentFolder = i
  selectorStore.typeSelected = 'folder'
}
</script>
<style scoped>
.folder-list {
  width: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: minmax(250px, 1fr);
  grid-auto-flow: row;
  gap: var(--global-space-s);
  grid-area: 1 / 2 / 2 / 3;
  overflow-y: auto;
  padding-bottom: var(--global-space-s);
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
    var(--color-form-control-alt) 10px,
    var(--color-form-control-alt) 20px
  );
}
</style>
