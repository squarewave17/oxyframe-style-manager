<template>
  <div class="search-control-panel panel">
    <h5>Search</h5>
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
const emit = defineEmits(['searchQuery', 'replacementName', 'replace'])
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
</style>
