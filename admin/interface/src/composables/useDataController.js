import { useGlobalStore } from '@/store/globalStore'
import { useSelectorStore } from '@/store/selectorStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
import useApiController from '@/composables/useApiController'

export default function dataController() {
  const globalStore = useGlobalStore()
  const selectorStore = useSelectorStore()
  const oxyJSONStore = useOxyJSONStore()
  const { getSettings, saveSettings } = useApiController()
  /**
   * initialize data
   */
  const initializeData = () => {
    try {
      getSettings()
        .then((response) => {
          globalStore.initStore(response.data)
          // oxyJSONStore.initStore(response.data)
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
    // console.log(JSON.stringify(oxyJSONStore.data))
    let data = {
      componentsClasses: selectorStoreData.componentsClasses,
      customSelectors: selectorStoreData.customSelectors,
      styleFolders: selectorStoreData.styleFolders,
      styleSets: selectorStoreData.styleSets,
      styleSheets: selectorStoreData.styleSheets,
      // oxyJson: JSON.parse(JSON.stringify(oxyJSONStore.data)),
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
