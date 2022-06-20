import { useSelectorStore } from '@/store/selectorStore'
import { computed, watchEffect } from 'vue'
export default function search() {
  const selectorStore = useSelectorStore()
  /**
   * Flatten Selectors - just in case....
   */
  let selectors = []
  watchEffect(() => {
    // selectors = JSON.parse(JSON.stringify(selectorStore.selectors))
    selectors = selectorStore.selectors
  })
  /**
   * Search
   */
  const searchSelectors = (query) => {
    //set up aray for the result
    const result = []
    //loop through selectors
    selectors.forEach((item, index) => {
      //get the keys of each selector
      Object.keys(item).forEach((objKey) => {
        //filter out some keys
        if (
          objKey !== 'key' &&
          objKey !== 'parent' &&
          objKey !== 'type' &&
          objKey !== 'set_name' &&
          objKey !== 'friendly_name' &&
          objKey !== 'originalFolder'
        ) {
          //if the key isn't media
          if (objKey !== 'media') {
            //get the css properties of each item
            Object.keys(item[objKey]).forEach((property) => {
              //define some constants for full screen size
              const state = objKey
              const selectorIndex = index
              const cssProperty = property
              const cssValue = item[state][cssProperty]
              // process items depending on property
              switch (cssProperty) {
                case 'gradient':
                  //Sort gradient items
                  item[state][cssProperty].colors.forEach((grad, i) => {
                    if (grad.value.includes(query)) {
                      let screen = ''
                      let gradColIndex = i
                      result.push({
                        selectorIndex,
                        screen,
                        state,
                        cssProperty,
                        gradColIndex,
                      })
                    }
                  })
                  break
                case 'custom-css':
                  if (item[state][cssProperty].includes(query)) {
                    let screen = ''
                    var cssString = item[state][cssProperty]
                    var cssArray = cssString
                      .split(';')
                      .map(function (line) {
                        return line.trim()
                      })
                      .filter(function (line) {
                        return line !== ''
                      })
                    var customCss = cssArray.map(function (rule) {
                      var stateValue = rule.split(':')
                      return {
                        customProperty: stateValue[0],
                        customValue: stateValue[1],
                      }
                    })
                    customCss.forEach((css) => {
                      if (css.customValue.includes(query)) {
                        result.push({
                          selectorIndex,
                          screen,
                          state,
                          cssProperty,
                          css,
                        })
                      }
                    })
                  }
                  break
                default:
                  if (item[state][cssProperty].includes(query)) {
                    let screen = ''
                    result.push({
                      selectorIndex,
                      screen,
                      state,
                      cssProperty,
                    })
                  }
              }
            })
            //if the key IS media
          } else if (objKey === 'media') {
            //get the screen sizes of each selector
            Object.keys(item[objKey]).forEach((screenSize) => {
              //get the state for each screen size
              Object.keys(item[objKey][screenSize]).forEach((mediaState) => {
                //get the css properties for each state
                Object.keys(item[objKey][screenSize][mediaState]).forEach(
                  (property) => {
                    //define some constants for media screen size
                    const screen = screenSize
                    const state = mediaState
                    const selectorIndex = index
                    const cssProperty = property
                    const cssValue = item[objKey][screen][state][cssProperty]
                    // process items depending on property
                    switch (cssProperty) {
                      case 'gradient':
                        //Sort gradient items
                        item[objKey][screen][state][cssProperty].colors.forEach(
                          (grad, i) => {
                            if (grad.value.includes(query)) {
                              let gradColIndex = i
                              result.push({
                                selectorIndex,
                                screen,
                                state,
                                cssProperty,
                                gradColIndex,
                              })
                            }
                          }
                        )
                        break
                      case 'custom-css':
                        //check if the property contains the query
                        if (
                          item[objKey][screen][state][cssProperty].includes(
                            query
                          )
                        ) {
                          var cssString =
                            item[objKey][screen][state][cssProperty]
                          //split css string into individual lines and put in array
                          var cssArray = cssString
                            .split(';')
                            .map(function (line) {
                              return line.trim()
                            })
                            .filter(function (line) {
                              return line !== ''
                            })
                          //loop through the css array and place values into array of objects with propery value pairs for each css rule
                          var customCss = cssArray.map(function (rule) {
                            var keyValue = rule.split(':')
                            return {
                              customProperty: keyValue[0],
                              customValue: keyValue[1],
                            }
                          })
                          customCss.forEach((css) => {
                            if (css.customValue.includes(query)) {
                              result.push({
                                selectorIndex,
                                screen,
                                state,
                                cssProperty,
                                css,
                              })
                            }
                          })
                        }
                        break
                      default:
                        if (
                          item[objKey][screen][state][cssProperty].includes(
                            query
                          )
                        ) {
                          result.push({
                            selectorIndex,
                            screen,
                            state,
                            cssProperty,
                          })
                        }
                    }
                  }
                )
              })
            })
          }
        }
      })
    })
    return result
  }

  const searchProperties = (query) => {
    //set up aray for the result
    const result = []
    //loop through selectors
    selectors.forEach((item, index) => {
      //get the keys of each selector
      Object.keys(item).forEach((objKey) => {
        //filter out some keys
        if (
          objKey !== 'key' &&
          objKey !== 'parent' &&
          objKey !== 'type' &&
          objKey !== 'set_name' &&
          objKey !== 'friendly_name' &&
          objKey !== 'originalFolder'
        ) {
          //if the key isn't media
          if (objKey !== 'media') {
            //get the css properties of each item
            Object.keys(item[objKey]).forEach((property) => {
              //define some constants for full screen size
              const state = objKey
              const selectorIndex = index
              const screen = ''
              const cssProperty = property
              if (
                cssProperty.includes(query) &&
                cssProperty !== 'font-family'
              ) {
                // process items depending on property
                switch (cssProperty) {
                  case 'gradient':
                    //Sort gradient items
                    item[state][cssProperty].colors.forEach((grad, i) => {
                      let gradColIndex = i
                      result.push({
                        selectorIndex,
                        screen,
                        state,
                        cssProperty,
                        gradColIndex,
                      })
                    })
                    break
                  case 'custom-css':
                    var cssString = item[state][cssProperty]
                    var cssArray = cssString
                      .split(';')
                      .map(function (line) {
                        return line.trim()
                      })
                      .filter(function (line) {
                        return line !== ''
                      })
                    //loop through the css array and place values into array of objects with propery value pairs for each css rule
                    cssArray.map(function (rule) {
                      var keyValue = rule.split(':')
                      const css = {
                        customProperty: keyValue[0],
                        customValue: keyValue[1],
                      }
                      result.push({
                        selectorIndex,
                        screen,
                        state,
                        cssProperty,
                        css,
                      })
                    })
                    break
                  default:
                    result.push({
                      selectorIndex,
                      screen,
                      state,
                      cssProperty,
                    })
                }
              }
              if (cssProperty === 'custom-css') {
                var cssString2 = item[state][cssProperty]
                var cssArray2 = cssString2
                  .split(';')
                  .map(function (line) {
                    return line.trim()
                  })
                  .filter(function (line) {
                    return line !== ''
                  })
                //loop through the css array and place values into array of objects with propery value pairs for each css rule
                cssArray2.map(function (rule) {
                  var keyValue = rule.split(':')
                  const css = {
                    customProperty: keyValue[0],
                    customValue: keyValue[1],
                  }
                  if (css.customProperty.includes(query)) {
                    result.push({
                      selectorIndex,
                      screen,
                      state,
                      cssProperty,
                      css,
                    })
                  }
                })
              }
            })
            //if the key IS media
          } else if (objKey === 'media') {
            //get the screen sizes of each selector
            Object.keys(item[objKey]).forEach((screenSize) => {
              //get the state for each screen size
              Object.keys(item[objKey][screenSize]).forEach((mediaState) => {
                //get the css properties for each state
                Object.keys(item[objKey][screenSize][mediaState]).forEach(
                  (property) => {
                    //define some constants for media screen size
                    const screen = screenSize
                    const state = mediaState
                    const selectorIndex = index
                    const cssProperty = property
                    if (
                      cssProperty.includes(query) &&
                      cssProperty !== 'font-family'
                    ) {
                      // process items depending on property
                      switch (cssProperty) {
                        case 'gradient':
                          //Sort gradient items
                          item[objKey][screen][state][
                            cssProperty
                          ].colors.forEach((grad, i) => {
                            let gradColIndex = i
                            result.push({
                              selectorIndex,
                              screen,
                              state,
                              cssProperty,
                              gradColIndex,
                            })
                          })
                          break
                        case 'custom-css':
                          var cssString =
                            item[objKey][screen][state][cssProperty]
                          //split css string into individual lines and put in array
                          var cssArray = cssString
                            .split(';')
                            .map(function (line) {
                              return line.trim()
                            })
                            .filter(function (line) {
                              return line !== ''
                            })
                          //loop through the css array and place values into array of objects with propery value pairs for each css rule
                          cssArray.map(function (rule) {
                            var keyValue = rule.split(':')
                            const css = {
                              customProperty: keyValue[0],
                              customValue: keyValue[1],
                            }
                            result.push({
                              selectorIndex,
                              screen,
                              state,
                              cssProperty,
                              css,
                            })
                          })
                          break
                        default:
                          result.push({
                            selectorIndex,
                            screen,
                            state,
                            cssProperty,
                          })
                      }
                    }
                    if (cssProperty === 'custom-css') {
                      var cssString2 = item[objKey][screen][state][cssProperty]
                      var cssArray2 = cssString2
                        .split(';')
                        .map(function (line) {
                          return line.trim()
                        })
                        .filter(function (line) {
                          return line !== ''
                        })
                      //loop through the css array and place values into array of objects with propery value pairs for each css rule
                      cssArray2.map(function (rule) {
                        var keyValue = rule.split(':')
                        const css = {
                          customProperty: keyValue[0],
                          customValue: keyValue[1],
                        }
                        if (css.customProperty.includes(query)) {
                          result.push({
                            selectorIndex,
                            screen,
                            state,
                            cssProperty,
                            css,
                          })
                        }
                      })
                    }
                  }
                )
              })
            })
          }
        }
      })
    })
    return result
  }
  return {
    searchSelectors,
    searchProperties,
  }
}
