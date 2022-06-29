<template>
  <div class="organiser-view">
    <OrganiserToolbar
      @viewSelect="viewSelect"
      :currentView="view"
    ></OrganiserToolbar>
    <component :is="cp"></component
    ><!-- cp is the control panel - must load first for teleports-->
    <component :is="mode"></component>
    <!-- <FolderList v-if="view === 'folder'" class="folder-organiser" />

    <SelectorList v-if="view === 'selector'" class="selector-organiser" /> -->

    <UncatSelectors v-if="view === 'folder'" class="organiser-uncat-list" />
  </div>
</template>
<script setup>
/**
 * import
 */
import { useSelectorStore } from '@/store/selectorStore'
import OrganiserToolbar from '@/components/selectors/OrganiserToolbar'
import SelectorList from '@/components/selectors/SelectorList'
import UncatSelectors from '@/components/selectors/UncatSelectors'
import OrganiserBulkRename from '@/components/selectors/OrganiserBulkRename'
import FolderList from '@/components/selectors/FolderList'
import FolderControlPanel from '@/components/selectors/control-panel/FolderControlPanel.vue'
import SelectorControlPanel from '@/components/selectors/control-panel/SelectorControlPanel.vue'
import BulkRenameControlPanel from '@/components/selectors/control-panel/BulkRenameControlPanel.vue'
import { ref, computed, onMounted } from 'vue'

/**
 * Conditions
 */
const notEmpty = computed(() => {
  if (selectorStore.selectorsEmpty) {
    return false
  } else {
    return true
  }
})
/**
 * data
 */
const view = ref('selector')
const selectorStore = useSelectorStore()

const cp = computed(() => {
  if (view.value === 'folder') {
    return FolderControlPanel
  } else if (view.value === 'selector') {
    return SelectorControlPanel
  } else if (view.value === 'bulk') {
    return BulkRenameControlPanel
  } else {
    return null
  }
})

const mode = computed(() => {
  if (view.value === 'folder') {
    return FolderList
  } else if (view.value === 'selector') {
    return SelectorList
  } else if (view.value === 'bulk') {
    return OrganiserBulkRename
  } else {
    return null
  }
})

const viewSelect = (v) => {
  view.value = v
  selectorStore.typeSelected = v
}

const itemName = computed(() => {
  if (notEmpty.value) {
    if (!selectorStore.classIsMulti) {
      switch (selectorStore.typeSelected) {
        case 'folder':
          return selectorStore.styleFolders[selectorStore.currentFolder].key
        case 'selector':
          return selectorStore.selectors[selectorStore.currentClass].key
        case 'custom-selector':
          return selectorStore.selectors[selectorStore.currentClass].key
        default:
          return 'empty'
      }
    } else {
      return 'Multi Selecion'
    }
  } else {
    return 'No Selectors Loaded'
  }
})
onMounted(() => {
  selectorStore.typeSelected = 'selector'
})
</script>
<style scoped>
.organiser-view {
  height: 100%;
  display: grid;
  grid-template-columns: 5fr 200px 300px;
  grid-template-rows: 31px 1fr;
  gap: var(--global-space-m);
}
.organiser-toolbar {
  grid-area: 1 / 1 / 2 / 2;
}
.folder-organiser {
  grid-area: 2 / 1 / 3 / 2;
}
.selector-organiser {
  grid-area: 2 / 1 / 3 / 3;
}
.organiser-uncat-list {
  grid-area: 1 / 2 / 3 / 3;
}
.folder-control-panel,
.selector-control-panel,
.bulk-rename-control-panel {
  grid-area: 1 / 3 / 3 / 4;
}
</style>
