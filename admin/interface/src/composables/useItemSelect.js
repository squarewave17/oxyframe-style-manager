import { useSelectorStore } from '@/store/selectorStore'
export default function itemSelect() {
  const selectorStore = useSelectorStore()

  const selectSheet = (sheet) => {
    let targetIndex
    for (var i = 0; i < selectorStore.styleSheets.length; i++) {
      if (selectorStore.styleSheets[i].id == sheet.id) {
        targetIndex = i
      }
    }
    selectorStore.currentStyleSheet = targetIndex
    selectorStore.typeSelected = 'sheet'
  }
  const selectSsFolder = (folder) => {
    let targetIndex
    for (var i = 0; i < selectorStore.styleSheetFolders.length; i++) {
      if (selectorStore.styleSheetFolders[i].id == folder.id) {
        targetIndex = i
      }
    }
    selectorStore.currentStyleSheetFolder = targetIndex
    selectorStore.typeSelected = 'stylesheet-folder'
  }
  const selectClass = (selector) => {
    let targetIndex
    for (var i = 0; i < selectorStore.selectors.length; i++) {
      if (selectorStore.selectors[i].key == selector.key) {
        targetIndex = i
      }
    }
    selectorStore.currentClass = [targetIndex]
    selectorStore.typeSelected = selector.type
  }

  return {
    selectSheet,
    selectSsFolder,
    selectClass,
  }
}
