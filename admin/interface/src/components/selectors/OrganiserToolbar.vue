<template>
  <div class="organiser-toolbar">
    <div class="view-switch">
      <div
        :class="{ active: currentView === 'folder' }"
        @click="$emit('viewSelect', 'folder')"
      >
        Folders
      </div>
      <div
        :class="{ active: currentView === 'selector' }"
        @click="$emit('viewSelect', 'selector')"
      >
        Selectors
      </div>
    </div>
  </div>
</template>
<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'
import BaseButton from '@/components/inputs/BaseButton.vue'
const selectorStore = useSelectorStore()
const props = defineProps({
  currentView: {
    type: String,
  },
})
</script>
<style scoped>
.organiser-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
}
.btn {
  margin-left: var(--global-space-s);
}
.btn-grp {
  display: flex;
}
.view-switch {
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 250px;
  height: 100%;
  border: 1px solid var(--color-form-control-alt);
  border-radius: var(--radius-m);
}
.view-switch > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  text-align: center;
  /* padding: var(--global-space-s); */
  cursor: pointer;
}
.view-switch > div.active {
  background-color: var(--color-background-panel);
  /* color: var(--color-background); */
}
</style>
