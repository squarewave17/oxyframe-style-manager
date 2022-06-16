<template>
  <div v-for="selector in selectorStore.selectedClasses" :key="selector">
    <h6>{{ selectorStore.selectors[selector].key }}</h6>
  </div>
</template>
<script setup>
import { useSelectorStore } from '@/store/selectorStore'
const selectorStore = useSelectorStore()
</script>
