import { useSelectorStore } from '@/store/selectorStore'
import { watchEffect } from 'vue'
import useBaseDecode from '@/composables/useBaseDecode'

export default function SelectorHelpers() {
  const selectorStore = useSelectorStore()
  const { decodeStyle, encodeStyle } = useBaseDecode()

  //Process input data from DB
  const processInput = (data) => {
    let selectors
    let customSelectors
    let styleFolders
    let styleSets
    let styleSheets
    if (data.componentsClasses === false) {
      data.componentsClasses = []
    }
    if (data.customSelectors === false) {
      data.customSelectors = []
    }
    if (data.styleFolders === false) {
      data.styleFolders = []
    }
    if (data.styleSets === false) {
      data.styleSets = []
    }
    if (data.styleSheets === false) {
      data.styleSheets = []
    }
    //Make arrays (Object.values)
    selectors = addDataType(
      Object.values(addKeyToEmpty(data.componentsClasses)),
      'selector'
    )
    customSelectors = addDataType(
      Object.values(addKeyToEmpty(data.customSelectors)),
      'custom-selector'
    )
    styleFolders = addDataType(Object.values(data.styleFolders), 'style-folder')
    styleFolders = addFolder(styleFolders, 'Uncategorized')
    styleSets = addSsUncatParent(
      addDataType(Object.values(data.styleSets), 'style-set')
    )

    //Combine selectors and custom selectors
    selectors = selectors.concat(customSelectors.reverse())

    styleSheets = initializeStylesheets(decodeStyle(data.styleSheets))
    const output = {
      selectors: selectors,
      styleFolders: styleFolders,
      styleSets: styleSets,
      styleSheets: addDataType(styleSheets.styleSheets, 'stylesheet'),
      styleSheetFolders: addDataType(
        styleSheets.styleSheetFolders,
        'stylesheet-folder'
      ),
      // usedClasses: data.usedClasses,
    }
    return output
  }
  const processOutput = (data) => {
    let componentsClasses = []
    let customSelectors = []
    let styleSheets = []
    //combine stylesheets and folders and remove uncategorized
    styleSheets = uninitStylesheets(data.styleSheets, data.styleSheetFolders)
    //remove uncategorized folder
    let styleFolders = data.styleFolders.filter((item) => {
      return item.key !== 'Uncategorized'
    })
    //split selectors
    for (var i = 0; i < data.selectors.length; i++) {
      if (data.selectors[i].type === 'selector') {
        componentsClasses.push(data.selectors[i])
      } else if (data.selectors[i].type === 'custom-selector') {
        customSelectors.push(data.selectors[i])
      }
    }
    componentsClasses = stripDataType(componentsClasses)
    customSelectors = stripDataType(customSelectors)
    styleFolders = stripDataType(styleFolders)
    let styleSets = removeSsUncatParent(stripDataType(data.styleSets))
    styleSheets = stripDataType(styleSheets)
    const dataOut = {
      componentsClasses: reKey(componentsClasses),
      customSelectors: reKey(customSelectors.reverse()),
      styleFolders: reKey(styleFolders),
      styleSets: reKey(styleSets),
      styleSheets: styleSheets,
      // usedClasses: data.usedClasses,
    }
    return dataOut
  }

  const initializeStylesheets = (input) => {
    var folders = []
    var css = []
    if (input)
      input.forEach((sheet) => {
        if (sheet.folder) {
          folders.push(sheet)
        } else {
          css.push(sheet)
        }
      })
    // add uncategorized folder
    folders.push({
      folder: 1,
      id: 0,
      name: 'Uncategorized',
      status: 1,
    })
    return { styleSheets: css, styleSheetFolders: folders }
  }
  const uninitStylesheets = (sheets, folders) => {
    sheets = encodeStyle(sheets)
    folders = folders.filter(function (item) {
      return item.id !== 0
    })

    return sheets.concat(folders)
  }
  //Process raw selectors and custom selectors
  const addKeyToEmpty = (input) => {
    let data = input
    for (var key in data) {
      //check for empty class and make a key with the classname
      if (!Object.prototype.hasOwnProperty.call(data, 'key')) {
        data[key].key = key
      }
      //Check if Selector content is undefined, and create empty object if so
      if (data[key].original === undefined) {
        data[key].original = {}
      }
      //check for empty class and convert 'original' array to object
      if (data[key].original.length === 0) {
        data[key].original = {}
      }
    }

    return data
  }
  //Add data types to data for easy handling later on
  const addDataType = (array, type) => {
    array.forEach((item) => {
      //if no parent, add Uncategorized parent
      if (!Object.prototype.hasOwnProperty.call(item, 'parent')) {
        item.parent = 'Uncategorized'
      }
      //add a type
      item.type = type
    })
    return array
  }
  //remove data types
  const stripDataType = (array) => {
    array.forEach((item) => {
      if (item.parent === 'Uncategorized') {
        delete item.parent
      }
      //remove type
      delete item.type
    })
    return array
  }
  //Add uncategorized folder to style folders
  const addFolder = (input, name, status = 1) => {
    input.push({
      key: name,
      status: status,
      type: 'style-folder',
    })
    return input
  }
  //if style set is uncategorized, add 'Uncategorized parent || if no folder is found, initialize one
  const addSsUncatParent = (array) => {
    let dat = array
    if (dat.length === 0) {
      dat = [
        {
          key: 'Uncategorized Custom Selectors',
          parent: 'Uncategorized',
          type: 'style-set',
        },
      ]
    }
    for (var i = 0; i < dat.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(dat[i], 'parent')) {
        dat[i].parent = 'Uncategorized'
      }
    }
    return dat
  }
  //if style set is has uncategorized, remove it
  const removeSsUncatParent = (array) => {
    let dat = array
    dat.forEach(function (item) {
      if (item.parent === 'Uncategorized') {
        delete item.key
      }
    })
    return dat
  }
  //Turn arrays back to keys
  const reKey = (x) => {
    var output = {}
    for (var i = 0; i < x.length; i++) {
      output[x[i].key] = x[i]
    }
    return output
  }
  //Keep custom selectors at the back
  const checkOrder = () => {
    const s = selectorStore.selectors
    var arr2 = s.filter(function (item) {
      return item.type !== 'custom-selector'
    })

    var arr3 = s.filter(function (item) {
      return item.type === 'custom-selector'
    })

    selectorStore.selectors = arr2.concat(arr3)
  }

  return {
    processInput,
    processOutput,
    addKeyToEmpty,
    addDataType,
    addFolder,
    checkOrder,
  }
}
