import { useGlobalStore } from '@/store/globalStore'
import { useSelectorStore } from '@/store/selectorStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
import { useColorStore } from '@/store/colorStore'
import useApiController from '@/composables/useApiController'

export default function dataController() {
  const globalStore = useGlobalStore()
  const selectorStore = useSelectorStore()
  const oxyJSONStore = useOxyJSONStore()
  const colorStore = useColorStore()
  const { getSettings, saveSettings } = useApiController()
  /**
   * initialize data
   */
  const initializeData = () => {
    try {
      getSettings()
        .then((response) => {
          globalStore.initStore(response.data)
          colorStore.initStore(response.data.colors)
          oxyJSONStore.initStore(response.data)
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
    let oxyJSON = JSON.parse(JSON.stringify(oxyJSONStore.data))
    console.log(oxyJSON)
    let data = {
      componentsClasses: selectorStoreData.componentsClasses,
      customSelectors: selectorStoreData.customSelectors,
      styleFolders: selectorStoreData.styleFolders,
      styleSets: selectorStoreData.styleSets,
      styleSheets: selectorStoreData.styleSheets,
      replaceClasses: oxyJSON,
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

  /**
   * Oxy Functions
   */
  // const oxyFn = async (fn, param) => {
  //   const data = {
  //     params: {
  //       fn: fn,
  //       param: param,
  //     },
  //   }
  //   try {
  //     fnCall(data).then((response) => {
  //       console.log(response.data)
  //       return response.data
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  return {
    initializeData,
    saveData,
    // oxyFn,
  }
}
