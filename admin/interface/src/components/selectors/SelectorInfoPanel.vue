<template>
  <div class="selector-info panel">
    <div v-if="selectorInfo !== undefined">
      <h5>Selector Info</h5>
      <p>
        Class Name: <span>{{ selectorInfo.class_name }}</span>
      </p>
      <p>
        Instances: <span>{{ selectorInstances }}</span>
      </p>
      <p>
        Page: <span>{{ selectorInfo.post_id }}</span>
      </p>
      <p>
        Component type: <span>{{ selectorInfo.component_type }}</span>
      </p>
      <p>
        Component Name: <span>{{ selectorInfo.component_name }}</span>
      </p>
      <p>
        In Code Block: <span>{{ selectorInfo.phpCode }}</span>
      </p>
    </div>
    <div class="selector-nav">
      <IconBack class="icon" @click="selectorCycle('down')" />
      {{ currentSelector + 1 }}/{{ selectorInstances }}
      <IconForward class="icon" @click="selectorCycle('up')" />
    </div>
  </div>
</template>
<script setup>
import IconForward from '@/components/icons/IconForward'
import IconBack from '@/components/icons/IconBack'
import { useSelectorStore } from '@/store/selectorStore'
import { ref, computed } from 'vue'
const selectorStore = useSelectorStore()

const props = defineProps(['selector'])

const selectorArray = computed(() => {
  if (props.selector) {
    return selectorStore.selectorInfo(props.selector)
  } else {
    return false
  }
})

const selectorInfo = computed(() => {
  if (selectorArray.value) {
    return selectorArray.value[currentSelector.value]
  } else {
    return false
  }
})
const selectorInstances = computed(() => {
  return selectorArray.value.length
})
/**
 * Cycle Logic
 */
const currentSelector = ref(0)
const selectorCycle = (dir) => {
  switch (dir) {
    case 'up':
      if (currentSelector.value < selectorInstances.value - 1) {
        currentSelector.value++
      } else {
        currentSelector.value = 0
      }
      break
    case 'down':
      if (currentSelector.value > 0) {
        currentSelector.value--
      } else {
        currentSelector.value = selectorInstances.value - 1
      }
      break
    default:
      break
  }
}
</script>
<style scoped>
.selector-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--global-space-m);
}
.selector-info p {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.selector-info p span {
  color: var(--color-text-muted);
}

.selector-info h5 {
  padding: var(--global-space-s) 0 var(--global-space-m) 0;
}
.selector-info button {
  margin: var(--global-space-m) 0;
}
.selector-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  cursor: pointer;
}
</style>
