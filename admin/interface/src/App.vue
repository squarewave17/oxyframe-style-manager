<template>
  <div v-show="desktop" class="oxyframe-wrapper">
    <NavBar />
    <router-view />
  </div>
  <div v-if="!desktop" class="non-desktop">
    <div class="non-desktop-container">
      <div class="logo-not-dt">
        <lottie-animation
          ref="animNotDt"
          :animationData="require('@/assets/logo.json')"
          :loop="true"
          :autoPlay="true"
          :speed="1"
        />
      </div>
      <h2>Oxyframe is not compatible with this device</h2>
      <h3>Please use something bigger</h3>
    </div>
  </div>
  <teleport to="body">
    <NotificationCard />
  </teleport>
</template>

<script setup>
/**
 * import
 */
import NavBar from '@/components/global/NavBar'
import NotificationCard from '@/components/global/NotificationCard'
import { onMounted } from 'vue'
import { useGlobalStore } from '@/store/globalStore'
import useDataController from '@/composables/useDataController'

import { useBreakpoints } from '@vueuse/core'
/**
 * store
 */
const globalStore = useGlobalStore()

/**
 * use
 */
const breakpoints = useBreakpoints({
  desktop: 1200,
})

const desktop = breakpoints.greater('desktop')
/**
 * lifecycle
 */
const { initializeData } = useDataController()
onMounted(() => {
  initializeData()
})
</script>

<style>
@import '@/assets/css/base.css';

.non-desktop {
  height: 100vh;
  display: grid;
  place-items: center;
}
.non-desktop-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-not-dt {
  max-width: 200px;
  margin-bottom: var(--global-space-xs);
}
</style>
