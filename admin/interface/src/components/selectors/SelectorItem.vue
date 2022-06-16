<template>
  <div
    class="order-selector component-class"
    :class="{ isselected: isSelected }"
  >
    <p class="text-limit">
      <span>{{ selectorIndex }}</span
      >{{ selectorName }}
    </p>

    <div class="icon-grid">
      <IconLockClosedSmall v-if="isLocked" class="icon-lock indicator" />
      <IconDisabled v-if="isDisabled" class="icon-disabled indicator" />
    </div>
  </div>
</template>

<script setup>
/**
 * import
 */
import { computed, toRefs, ref } from 'vue'
import { useSelectorStore } from '@/store/selectorStore'
import IconLockClosedSmall from '@/components/icons/IconLockClosedSmall.vue'
import IconDisabled from '@/components/icons/IconDisabled.vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()
/**
 * props
 */
const props = defineProps({
  type: {
    type: String,
  },
  selectorName: {
    type: String,
    default: 'Empty Class',
  },
  selectorIndex: {
    type: Number,
  },
})
const { selectorName } = toRefs(props)
const { selectorIndex } = toRefs(props)

const isSelected = computed(() => {
  return selectorStore.currentClass.indexOf(selectorIndex.value) !== -1
})
const isLocked = computed(() => {
  if (
    selectorStore.selectors[selectorIndex.value].original['selector-locked'] ===
    'true'
  ) {
    return true
  } else {
    return false
  }
})
const isDisabled = computed(() => {
  const parent = selectorStore.selectors[selectorIndex.value].parent
  if (selectorStore.disabledFolderList.includes(parent)) {
    return true
  } else {
    return false
  }
})
</script>
<style scoped>
.component-class {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  min-width: 250px;
  height: 6.66%;
}
.order-selector {
  border-radius: var(--radius-m);
  border: 1px solid var(--color-background-panel);
  background-color: var(--color-background-panel);
}
.order-selector p {
  user-select: none;
}
.icon-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
.icon-lock {
  grid-area: 1 / 1 / 2 / 2;
}
.icon-disabled {
  grid-area: 3 / 1 / 4 / 2;
}

.isselected {
  border: 1px solid var(--color-global-border);
  background-color: var(--color-background-active);
}
.text-limit {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 28ch;
}
p span {
  margin-right: var(--global-space-s);
}
.indicator {
  width: 11px;
  height: 11px;
}
</style>
