import { defineStore } from 'pinia'

export const useOxyJSONStore = defineStore('oxyJSONStore', {
  state: () => {
    return {
      data: {},
    }
  },
  actions: {
    initStore(data) {
      this.data = data.oxyJson
      console.log(this.data)
    },
    async replaceClass(currentClass, newClass) {
      const searchForClasses = (obj) => {
        //if the obj has options key
        if (obj.options) {
          //if the options key has classes key
          console.log(obj.options)
          if (obj.options.classes) {
            //for each class in the classes key
            obj.options.classes.forEach((className) => {
              //if the class matches the className
              if (className === currentClass) {
                //replace the class with the newClass
                obj.options.classes[obj.options.classes.indexOf(currentClass)] =
                  newClass

                //replace active selector
                obj.options.activeselector = newClass
              }
            })
          }
        }
        //if the obj has children key
        if (obj.children) {
          //for each child in the children key
          obj.children.forEach((child) => {
            //search for classes in the child
            searchForClasses(child)
          })
        }
      }
      //for each object in state.data
      Object.keys(this.data).forEach((key) => {
        //search for classes in the object
        searchForClasses(this.data[key])
      })
      return true
    },
  },
  getters: {
    usedClassList: (state) => {
      let usedClassList = []

      const searchForClasses = (obj) => {
        //if the obj has options key
        if (obj.options) {
          //if the options key has classes key
          // console.log(obj.options)
          if (obj.options.classes) {
            //for each class in the classes key
            obj.options.classes.forEach((className) => {
              //if the class is a string and not already in the usedClassList
              if (
                typeof className === 'string' &&
                usedClassList.indexOf(className) === -1
              ) {
                //add it to the usedClassList
                usedClassList.push(className)
              }
            })
          }
        }
        //if the obj has children key
        if (obj.children) {
          //for each child in the children key

          obj.children.forEach((child) => {
            //search for classes in the child
            searchForClasses(child)
          })
        }
      }
      //for each object in state.data

      Object.keys(state.data).forEach((key) => {
        //search for classes in the object
        searchForClasses(state.data[key])
      })

      //return the usedClassList
      return usedClassList
    },
  },
})
