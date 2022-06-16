import { defineStore } from 'pinia'
import useSystemDetect from '@/composables/useSystemDetect'

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return {
      version: '1.0.0',
      isLoading: true,
      isSaving: false,
      saved: false,
      breakPoints: [],
      browser: '',
      protocol: '',
    }
  },
  actions: {
    initStore(data) {
      const { isBrowser, isSsl } = useSystemDetect()
      this.breakPoints = data.breakpoints
      this.browser = isBrowser()
      this.protocol = isSsl()
    },
    hasSaved() {
      this.saved = true
      setTimeout(() => {
        this.saved = false
      }, 3000)
    },
  },
  /**
   * Getters aren't functions, so params arent passed as you'd expect
   */
  getters: {
    working: (state) => {
      if (state.isLoading === true || state.isSaving === true) {
        return true
      } else {
        return false
      }
    },
    screenSize: (state) => {
      return (query) => {
        return state.breakPoints[query]
      }
    },
    fileAccess: (state) => {
      if (state.browser === 'firefox' || state.protocol === 'http') {
        return false
      } else {
        return true
      }
    },
  },
})
