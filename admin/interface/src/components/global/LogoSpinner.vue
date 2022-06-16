<template>
  <lottie-animation
    class="logo"
    ref="anim"
    :animationData="require('@/assets/logo.json')"
    :loop="isLoop"
    :autoPlay="true"
    :speed="3"
    @loopComplete="loopComplete"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useGlobalStore } from '@/store/globalStore'

/**
 * store
 */
const globalStore = useGlobalStore()

// const loading = ref(fontStore.isLoading)
// const saving = ref(fontStore.isSaving)

const play = computed(() => {
  return globalStore.working
})

watch(play, (newValue) => {
  if (newValue === false) {
    stopLogo()
  } else {
    playLogo()
  }
})
/**
 * lottie
 */
//data
let isLoop = ref(true)

//refs
const anim = ref(null)
//methods
const playLogo = () => {
  anim.value.play()
}
const stopLogo = () => {
  isLoop.value = false
}
//event handlers
const loopComplete = () => {
  if (isLoop.value === false) {
    anim.value.stop()
    isLoop.value = true
  }
}
</script>

<style scoped>
.logo {
  max-width: 70px;
  display: flex;
  align-items: center;
}
</style>
