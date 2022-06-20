import { useGlobalStore } from '@/store/globalStore'
import { useSelectorStore } from '@/store/selectorStore'
import useApiController from '@/composables/useApiController'
import { computed } from 'vue'

export default function dataController() {
  const globalStore = useGlobalStore()
  const selectorStore = useSelectorStore()
  const { getSettings, saveSettings } = useApiController()
  /**
   * initialize data
   */
  const initializeData = () => {
    try {
      getSettings()
        .then((response) => {
          globalStore.initStore(response.data)
          selectorStore.getSet(response.data)
        })
        .then(() => {
          globalStore.isLoading = false
        })
    } catch (err) {
      console.log(err)
    }
  }
  // Initialize data END

  /**
   * Save Data
   */
  const saveData = () => {
    globalStore.isSaving = true
    let selectorStoreData = selectorStore.saveSet()
    let data = {
      componentsClasses: selectorStoreData.componentsClasses,
      customSelectors: selectorStoreData.customSelectors,
      styleFolders: selectorStoreData.styleFolders,
      styleSets: selectorStoreData.styleSets,
      styleSheets: selectorStoreData.styleSheets,
    }
    try {
      saveSettings(data).then((response) => {
        //decode the css data again
        selectorStore.getSet(selectorStoreData)

        globalStore.isSaving = false
        globalStore.hasSaved()
      })
    } catch (err) {
      console.log('Error saving data', err)
    }
  }
  // Save Data END
  return {
    initializeData,
    saveData,
  }
}
