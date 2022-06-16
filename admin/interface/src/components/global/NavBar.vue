<template>
  <nav class="navbar">
    <div class="nav-end nav-left">
      <LogoSpinner />
    </div>
    <h5>
      Oxyframe Style manager v<span>{{ globalStore.version }}</span>
    </h5>

    <div class="nav-end nav-right">
      <div class="controls"></div>
      <BaseToggleSwitch
        v-model="isDark"
        falseLabel="Light"
        trueLabel="Dark"
        class="control-icon dark-mode"
      />
      <SaveButton />
    </div>
  </nav>
</template>

<script setup>
/**
 * import
 */
import { useGlobalStore } from '@/store/globalStore'
import LogoSpinner from '@/components/global/LogoSpinner'
import SaveButton from '@/components/global/SaveButton'
import BaseToggleSwitch from '@/components/inputs/BaseToggleSwitch.vue'
import { useDark } from '@vueuse/core'

const globalStore = useGlobalStore()
/**
 * Dark Mode
 */
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
</script>
<style>
/* Navigation Bar */
nav {
  padding: var(--global-space-l) var(--global-space-l) var(--global-space-l)
    var(--global-space-l);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
}
nav h3 {
  margin: 0;
  text-transform: capitalize;
}
.nav-end {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* width: 35%; */
}
.nav h5 {
  color: var(--color-text-muted);
}
/* Navigation Links */
.nav-links {
  padding-left: var(--global-space-l);
}
a {
  color: var(--color-link);
}
a.router-link-active,
a:active {
  color: var(--color-link-active);
}

a:focus {
  box-shadow: none;
  color: var(--color-link-active);
}
/* End of Navigation Links */

/*Controls*/
.controls {
  display: flex;
  align-items: center;
}
.controls > * {
  margin-right: 5px;
}

.control-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  color: var(--color-text);
}
.control-icon svg {
  fill: var(--color-text);
}
.control-icon:before {
  font-size: 12px;
  position: absolute;
  bottom: -28px;
  opacity: 0;
  transition: opacity 0.1s ease-in;
}

.control-icon:hover:before {
  opacity: 1;
}

.control-icon.save:before {
  content: 'Save';
}
.control-icon.preview-size:before {
  content: 'Preview Size';
}
.control-icon.preview-type:before {
  content: 'Preview';
}
.control-icon.font-unit:before {
  content: 'Font Unit';
}
.control-icon.font-rounding:before {
  content: 'Rounding';
}
.control-icon.dark-mode:before {
  content: 'Theme';
}

.control-icon.color-library:before {
  content: 'Library';
}
</style>
