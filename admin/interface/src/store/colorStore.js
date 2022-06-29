import { defineStore } from 'pinia'

export const useColorStore = defineStore('colorStore', {
  state: () => {
    return {
      colors: {},
    }
  },
  actions: {
    initStore(data) {
      this.colors = data
    },
  },
  /**
   * Getters aren't functions, so params arent passed as you'd expect
   */
  getters: {
    getColorById: (state) => {
      return (color) => {
        // extract the number from the color string
        if (color.includes('var(--')) {
          return color
        }
        const colorNumber = parseInt(color.replace(/[^0-9]/g, ''))
        // extract the array here to keep it tidy
        const colors = state.colors.colors
        //loop throught each item in colors array
        for (let i = 0; i < colors.length; i++) {
          //if the object.id matches the colorNumber
          if (colors[i].id === colorNumber) {
            //return the value
            return colors[i].value
          }
        }
      }
    },
  },
})
