<template>
  <div class="search-view">
    <div class="search-results">
      <div class="search-results-header">
        <div>Selector</div>
        <div>Break Point</div>
        <div>Selector State</div>
        <div>Property</div>
        <div>Current Value</div>
        <div>New Value</div>
      </div>
      <SearchResult
        v-for="(result, index) in searchResults"
        :key="index"
        :selectorIndex="result.selectorIndex"
        :screen="result.screen"
        :stateKey="result.state"
        :selProperty="result.cssProperty"
        :gradColIndex="result.gradColIndex"
        :css="result.css"
        :replaceAll="replaceAll"
        v-model="newValues[index]"
      />
    </div>
    <SearchControlPanel
      @searchQuery="querySelectors"
      @replacementName="replacementName"
      @replace="replaceValues"
      @mode="switchMode"
      :mode="mode"
    />
  </div>
</template>

<script setup>
/**
 * Import
 */
import { reactive, computed, onMounted, ref, watchEffect } from 'vue'
import SearchControlPanel from '@/components/selectors/control-panel/SearchControlPanel.vue'
import SearchResult from '@/components/selectors/SearchResult.vue'
import { useSelectorStore } from '@/store/selectorStore'
import useSearch from '@/composables/useSearch.js'
/**
 * stores
 */
const selectorStore = useSelectorStore()

const search = useSearch()

/**
 * Data
 */
const searchResults = ref('')
const searchQuery = ref('')
const replaceAll = ref('')
const newValues = ref([])
const mode = ref('value')

const switchMode = (m) => {
  mode.value = m
}

const querySelectors = (q) => {
  switch (mode.value) {
    case 'value':
      if (q.length >= 1) searchResults.value = search.searchSelectors(q)
      break
    case 'props':
      if (q.length >= 1) searchResults.value = search.searchProperties(q)
      break
  }
}

const replacementName = (r) => {
  replaceAll.value = r
  if (searchResults.value !== '') {
    searchResults.value.forEach((value, index) => {
      newValues.value[index] = r
    })
  }
}

const processCss = (origCss, property, value) => {
  var cssArray = origCss.split(';')
  var cssProperty = property
  var cssValue = value
  var result = ''
  for (var i = 0; i < cssArray.length - 1; i++) {
    if (cssArray[i].indexOf(cssProperty) > -1) {
      cssArray[i] = cssProperty + ':' + cssValue
    }
    result += cssArray[i] + '; '
  }
  return result.trim()
}
const replaceValues = () => {
  searchResults.value.forEach((item, index) => {
    if (newValues.value[index] !== undefined && newValues.value[index] !== '') {
      switch (item.cssProperty) {
        case 'custom-css':
          switch (item.screen) {
            case '':
              selectorStore.selectors[item.selectorIndex][item.state][
                item.cssProperty
              ] = processCss(
                selectorStore.selectors[item.selectorIndex][item.state][
                  item.cssProperty
                ],
                item.css.customProperty,
                newValues.value[index]
              ).replace(/\s+/g, ' ')
              searchResults.value[index].css.customValue =
                newValues.value[index]
              break
            default:
              selectorStore.selectors[item.selectorIndex].media[item.screen][
                item.state
              ][item.cssProperty] = processCss(
                selectorStore.selectors[item.selectorIndex].media[item.screen][
                  item.state
                ][item.cssProperty],
                item.css.customProperty,
                newValues.value[index]
              ).replace(/\s+/g, ' ')
              searchResults.value[index].css.customValue =
                newValues.value[index]
          }
          break
        case 'gradient':
          switch (item.screen) {
            case '':
              selectorStore.selectors[item.selectorIndex][
                item.state
              ].gradient.colors[item.gradColIndex].value =
                newValues.value[index]
              break
            default:
              selectorStore.selectors[item.selectorIndex].media[item.screen][
                item.state
              ][item.cssProperty].colors[item.gradColIndex].value =
                newValues.value[index]
          }
          break
        default:
          switch (item.screen) {
            case '':
              selectorStore.selectors[item.selectorIndex][item.state][
                item.cssProperty
              ] = newValues.value[index]
              break
            default:
              selectorStore.selectors[item.selectorIndex].media[item.screen][
                item.state
              ][item.cssProperty] = newValues.value[index]
          }
          break
      }
      newValues.value[index] = ''
    }
  })
  replaceAll.value = ''
}
</script>

<style scoped>
/* Layout */
.search-view {
  height: 100%;
  display: grid;
  grid-template-columns: 5fr 300px;
  grid-template-rows: 1fr;
  gap: var(--global-space-m);
  grid-auto-flow: row;
}
.search-control-panel {
  grid-area: 1 / 2 / 2 / 3;
}
.search-results {
  grid-area: 1 / 1 / 2 / 2;
  overflow: auto;
}
.search-results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--global-space-s);
  margin-bottom: var(--global-space-s);
}
.search-results-header > div {
  width: 20%;
}
</style>
