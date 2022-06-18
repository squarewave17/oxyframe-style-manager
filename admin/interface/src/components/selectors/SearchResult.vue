<template>
  <div class="search-result">
    <div class="selector">
      <p class="text-limit">{{ selectorStore.selectors[selectorIndex].key }}</p>
    </div>
    <div class="screen">
      <IconOxyFull v-if="screen === ''" class="icon-s" />
      <span v-if="screen === ''">Full Screen</span>
      <IconOxyPage v-if="screen === 'page-width'" class="icon-s" />
      <span v-if="screen === 'page-width'">Page Width</span>
      <IconOxyTablet v-if="screen === 'tablet'" class="icon-s" />
      <span v-if="screen === 'tablet'">Tablet</span>
      <IconOxyLandscape v-if="screen === 'phone-landscape'" class="icon-s" />
      <span v-if="screen === 'phone-landscape'">Phone Landscape</span>
      <IconOxyPortrait v-if="screen === 'phone-portrait'" class="icon-s" />
      <span v-if="screen === 'phone-portrait'">Phone Portrait</span>
    </div>
    <div class="state">{{ stateKey }}</div>
    <div class="property" v-if="selProperty === 'custom-css'">
      {{ css.customProperty }}
      <span>&nbsp;(custom css)</span>
    </div>
    <div class="property" v-else>
      {{ selProperty }}
      <span v-if="selProperty === 'gradient'">
        &nbsp;(color {{ gradColIndex + 1 }})
      </span>
    </div>
    <!-- Gradient Value -->
    <div class="value" v-if="selProperty === 'gradient'">
      <span v-if="screen === ''">
        {{
          selectorStore.selectors[selectorIndex][stateKey][selProperty].colors[
            gradColIndex
          ].value
        }}
      </span>
      <span v-if="screen !== ''">
        {{
          selectorStore.selectors[selectorIndex].media[screen][stateKey][
            selProperty
          ].colors[gradColIndex].value
        }}
      </span>
    </div>
    <!-- Custom CSS -->
    <div class="value" v-else-if="selProperty === 'custom-css'">
      <span v-if="screen === ''">
        {{ css.customValue }}
      </span>
      <span v-if="screen !== ''">
        {{ css.customValue }}
      </span>
    </div>
    <!-- Normal value -->
    <div class="value" v-else>
      <div class="unit-pair" v-if="screen === ''">
        {{ selectorStore.selectors[selectorIndex][stateKey][selProperty] }}
        <BaseUnitSelect
          v-if="showUnits"
          v-model="
            selectorStore.selectors[selectorIndex][stateKey][
              `${selProperty}-unit`
            ]
          "
        />
      </div>
      <div class="unit-pair" v-if="screen !== ''">
        {{
          selectorStore.selectors[selectorIndex].media[screen][stateKey][
            selProperty
          ]
        }}
        <BaseUnitSelect
          v-if="showUnits"
          v-model="
            selectorStore.selectors[selectorIndex].media[screen][stateKey][
              `${selProperty}-unit`
            ]
          "
        />
      </div>
    </div>

    <div class="new-value">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
/**
 * Import
 */
import { useSelectorStore } from '@/store/selectorStore'
import IconOxyFull from '@/components/icons/IconOxyFull.vue'
import IconOxyPage from '@/components/icons/IconOxyPage.vue'
import IconOxyTablet from '@/components/icons/IconOxyTablet.vue'
import IconOxyLandscape from '@/components/icons/IconOxyLandscape.vue'
import IconOxyPortrait from '@/components/icons/IconOxyPortrait.vue'
import BaseUnitSelect from '@/components/inputs/BaseUnitSelect.vue'
import { computed, toRefs, ref, watchEffect, onMounted } from 'vue'
/**
 * stores
 */
const selectorStore = useSelectorStore()

const { replaceAll } = toRefs(props)

const sizeUnit = ref('px')

/**
 * props
 */
const props = defineProps({
  modelValue: {
    type: String,
  },
  selectorIndex: {
    type: Number,
  },
  css: {
    type: Object,
  },
  screen: {
    type: String,
  },
  selProperty: {
    type: String,
  },
  stateKey: {
    type: String,
  },
  gradColIndex: {
    type: Number,
  },
  replaceAll: {
    type: String,
  },
})
defineEmits(['update:modelValue'])
const newValue = ref('')
watchEffect(() => (newValue.value = replaceAll.value))
/**
 * Size unit setup
 */
const unitCheck = (value, array) => {
  return array.indexOf(value) > -1
}
const allowedProperties = [
  'font-size',
  'padding-left',
  'padding-right',
  'padding-bottom',
  'padding-top',
  'margin-left',
  'margin-right',
  'margin-bottom',
  'margin-top',
  'border-radius',
  'border-left-width',
  'border-right-width',
  'border-top-width',
  'border-bottom-width',
  'height',
  'width',
  'max-width',
  'letter-spacing',
]
const showUnits = computed(() => {
  return unitCheck(props.selProperty, allowedProperties)
})
</script>

<style scoped>
.search-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-s);
  min-height: 50px;
  border-radius: var(--radius-m);
  background-color: var(--color-background-panel);
  font-size: var(--of-font-6);
}
.search-result > div {
  width: 20%;
  display: flex;
  align-items: center;
}
.icon-s {
  padding-right: 4px;
}
.text-limit {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 28ch;
}
.unit-pair {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
