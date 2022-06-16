<template>
  <div class="selectors container">
    <router-view></router-view>
  </div>
  <teleport to=".controls">
    <div class="view-switch">
      <router-link to="/">Overview</router-link>
      <router-link to="/organiser"> Organiser </router-link>
      <router-link to="/search"> Search/Replace </router-link>
      <router-link to="/stylesheets"> Stylesheets </router-link>
    </div>
  </teleport>
</template>

<script setup>
/**
 * import
 */

import BaseButton from '@/components/inputs/BaseButton.vue'

import { useSelectorStore } from '@/store/selectorStore'

/**
 * stores
 */
const selectorStore = useSelectorStore()
</script>

<style>
/* Layout */
.selectors.container {
  height: calc(100vh - 132px);
}

.view-switch {
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 600px;
  height: 32px;
  border: 1px solid var(--color-form-control-alt);
  border-radius: var(--radius-m);
}
.view-switch > a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  text-align: center;
  font-size: var(--of-font-6);
  /* padding: var(--global-space-s); */
  cursor: pointer;
  user-select: none;
}
.view-switch > a.router-link-active {
  color: var(--color-text);
}
.view-switch > a.router-link-exact-active {
  background-color: var(--color-background-panel);
  color: var(--color-text);
}
.view-switch > a.router-link-exact-active:focus {
  box-shadow: none;
  border: none;
  outline: none;
}
.view-switch > a.router-link-exact-active:target {
  box-shadow: none;
  border: none;
  outline: none;
}
</style>
