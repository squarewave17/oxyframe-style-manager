<template>
  <!-- <button @click="postData()" class="of-btn of-btn-default">Save</button> -->
  <button
    :disabled="globalStore.isSaving === true"
    class="control-icon save"
    @click="saveSettings"
  >
    <svg viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
      />
    </svg>
  </button>
</template>
<script setup>
/**
 * import
 */
import useDataController from '@/composables/useDataController'
import { useGlobalStore } from '@/store/globalStore'
const globalStore = useGlobalStore()

const { saveData } = useDataController()
/**
 * store
 */
const saveSettings = () => {
  saveData()
}
</script>
<style scoped>
button.save {
  border: none;
  background-color: var(--color-background);
}
button.save:disabled svg {
  fill: var(--color-form-control-alt);
}

/* button.save,
button.save:disabled svg {
  transition: fill 0.5s, background-color 0.5s;
} */
svg {
  width: 30px;
}
</style>
