<template>
  <div class="info panel">
    <h5>Project Info</h5>
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.allClasses,
          name: 'All Selectors',
        })
      "
    >
      All Selectors:
      <span>{{ selectorStore.allClasses.length }}</span>
    </p>
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.oxyClasses,
          name: 'Oxygen Selectors',
        })
      "
    >
      Oxygen Selectors:
      <span>{{ selectorStore.oxyClasses.length }}</span>
    </p>
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.customSelectorClasses,
          name: 'Custom Selectors',
        })
      "
    >
      Custom Selectors:
      <span>{{ selectorStore.customSelectorClasses.length }}</span>
    </p>
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.codeBlockClasses,
          name: 'Codeblock Selectors',
        })
      "
    >
      Codeblock Selectors:
      <span>{{ selectorStore.codeBlockClasses.length }}</span>
    </p>
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.styleSheetClasses,
          name: 'Stylesheet Selectors',
        })
      "
    >
      Stylesheet Selectors:
      <span>{{ selectorStore.styleSheetClasses.length }}</span>
    </p>
    <!-- <p>
      Active:
      <span>{{ selectorStore.activeSelectors.length }}</span>
    </p> -->
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.unusedClasses,
          name: 'Unused Selectors',
        })
      "
    >
      Unused Oxygen Selectors:
      <span>{{ selectorStore.unusedClasses.length }}</span>
    </p>
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.missingClasses,
          name: 'Missing Selectors',
        })
      "
    >
      Missing:
      <span>{{ selectorStore.missingClasses.length }}</span>
    </p>
    <p
      @click="
        $emit('changeData', {
          data: selectorStore.inactiveSelectors,
          name: 'Disabled Selectors',
        })
      "
    >
      Disabled:
      <span>{{ selectorStore.inactiveSelectors.length }}</span>
    </p>
  </div>
</template>
<script setup>
import { useSelectorStore } from '@/store/selectorStore'
const selectorStore = useSelectorStore()
const props = defineProps({
  all: {
    type: Number,
    default: 0,
  },
  oxy: {
    type: Number,
    default: 0,
  },
  custom: {
    type: Number,
    default: 0,
  },
  codeblock: {
    type: Number,
    default: 0,
  },
  stylesheet: {
    type: Number,
    default: 0,
  },
})
</script>
<style scoped>
.info {
  padding: var(--global-space-m);
}
.info p {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.info h5 {
  padding: var(--global-space-s) 0 var(--global-space-m) 0;
}
.info p span {
  color: var(--color-text-muted);
}
</style>
