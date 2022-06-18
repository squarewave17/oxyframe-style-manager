<template>
  <div class="search-control-panel panel">
    <h5>Search</h5>
    <div class="search-mode-switch">
      <div
        :class="{ active: mode === 'value' }"
        @click="$emit('mode', 'value')"
      >
        Value
      </div>
      <div
        :class="{ active: mode === 'props' }"
        @click="$emit('mode', 'props')"
      >
        Property
      </div>
    </div>
    <input
      type="text"
      @input="$emit('searchQuery', searchQuery)"
      v-model="searchQuery"
    />
    <h5>Replace</h5>
    <input
      type="text"
      @input="$emit('replacementName', replacementName)"
      v-model="replacementName"
    />
    <BaseButton
      width="full"
      @click=";[$emit('replace'), (replacementName = '')]"
    >
      <span>Replace Values</span>
      <IconReplace class="icon" />
    </BaseButton>
  </div>
</template>

<script setup>
const props = defineProps(['mode'])
/**
 * Import
 */
import { ref } from 'vue'
import BaseButton from '@/components/inputs/BaseButton.vue'
import IconReplace from '@/components/icons/IconReplace.vue'

/**
 * Data
 */
const searchQuery = ref('')
const replacementName = ref('')
/**
 * Emit
 */
const emit = defineEmits(['searchQuery', 'replacementName', 'replace', 'mode'])
</script>

<style scoped>
.search-control-panel {
  position: relative;
  overflow: hidden;
  text-align: center;
}
.search-control-panel h5 {
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-m);
}
.search-control-panel input {
  width: 100%;
  margin-bottom: var(--global-space-l);
}
.search-control-panel button {
  margin-bottom: var(--global-space-l);
}
.search-mode-switch {
  display: flex;
  width: 100%;
  margin-bottom: var(--global-space-m);
  border: 1px solid var(--color-global-border);
  border-radius: var(--radius-m);
  user-select: none;
  overflow: hidden;
}
.search-mode-switch > div {
  width: 50%;
  text-align: center;
  padding: var(--global-space-s);
  cursor: pointer;
}
.search-mode-switch > div.active {
  background-color: var(--color-background-active);
  /* color: var(--color-background); */
}
</style>
