import { defineStore } from 'pinia'
import { useGlobalStore } from '@/store/globalStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
import useSelectorHelpers from '@/composables/useSelectorHelpers'
import useClassCompiler from '@/composables/useClassCompiler'
import useOxyDataCompiler from '@/composables/useOxyDataCompiler'
import useFileSystem from '@/composables/useFileSystem'

export const useSelectorStore = defineStore('selectorStore', {
  state: () => {
    return {
      selectors: [],
      styleFolders: [],
      styleSets: [],
      styleSheets: [],
      styleSheetFolders: [],
      currentClass: [0],
      currentFolder: 0,
      currentStyleSet: 0,
      currentStyleSheet: 0,
      currentStyleSheetFolder: 0,
      typeSelected: 'selector',
      usedClasses: [],
      usedClassData: [],
      codeBlockClasses: [],
      styleSheetClasses: [],
      replaceClasses: [],
    }
  },
  actions: {
    /**
     * Loading/Saving Data
     */
    getSet(data) {
      console.log('getset')
      const { processInput } = useSelectorHelpers()

      this.setData(processInput(data))
    },
    saveSet() {
      const { processOutput } = useSelectorHelpers()
      return processOutput(this.getData())
    },
    async loadFile(file) {
      const globalStore = useGlobalStore()
      const fileSystem = useFileSystem()
      let data
      if (!globalStore.fileAccess) {
        data = file
      } else {
        data = await fileSystem.loadData()
      }
      data = JSON.parse(data)
      if (data.fileType === 'selector-store' || data.fileType === 'folder') {
        this.setLocalData(data.data)
      } else {
        alert('Wrong file type')
      }
    },
    async saveFile(name) {
      const fileSystem = useFileSystem()
      const globalStore = useGlobalStore()
      let data = {
        fileType: 'selector-store',
        data: this.getLocalData(),
      }
      if (!globalStore.fileAccess) {
        data = JSON.stringify(data)
        let filename = name || 'export'
        let element = document.createElement('a')
        element.setAttribute(
          'href',
          'data:application/json;charset=utf-8,' + encodeURIComponent(data)
        )
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()
        document.body.removeChild(element)
      } else {
        await fileSystem.saveData(JSON.stringify(data))
      }
    },
    async saveFolder(name) {
      const fileSystem = useFileSystem()
      const globalStore = useGlobalStore()
      let data = {
        fileType: 'folder',
        data: this.getFolderData(),
      }
      if (!globalStore.fileAccess) {
        data = JSON.stringify(data)
        let filename = name || 'export'
        let element = document.createElement('a')
        element.setAttribute(
          'href',
          'data:application/json;charset=utf-8,' + encodeURIComponent(data)
        )
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()
        document.body.removeChild(element)
      } else {
        await fileSystem.saveData(JSON.stringify(data))
      }
    },
    async mergeFile(file) {
      const globalStore = useGlobalStore()
      const fileSystem = useFileSystem()
      let data
      if (!globalStore.fileAccess) {
        data = file
      } else {
        data = await fileSystem.loadData()
      }
      data = JSON.parse(data)
      if (data.fileType === 'selector-store' || data.fileType === 'folder') {
        this.mergeInput(data.data)
      } else {
        alert('Wrong file type')
      }
    },
    mergeInput(data) {
      this.selectors = this.merge(this.selectors, data.selectors)
      this.styleFolders = this.merge(this.styleFolders, data.styleFolders)
      this.styleSets = this.merge(this.styleSets, data.styleSets)
    },
    merge(currentData, newData) {
      var temp = currentData.concat(newData)
      var result = temp.filter(function (item, pos) {
        return (
          temp
            .map(function (mapItem) {
              return mapItem['key']
            })
            .indexOf(item['key']) === pos
        )
      })
      return result
    },
    setData(data) {
      this.selectors = data.selectors
      this.styleFolders = data.styleFolders
      this.styleSets = data.styleSets
      this.styleSheets = data.styleSheets
      this.styleSheetFolders = data.styleSheetFolders
      // this.usedClasses = data.usedClasses
      const { compile } = useClassCompiler()
      const { compileData } = useOxyDataCompiler()
      console.log(compileData())
      const compiled = compile()
      this.usedClasses = compiled.usedClassList
      this.usedClassData = compiled.usedClassData
      this.styleSheetClasses = compiled.styleSheetClasses
      this.codeBlockClasses = compiled.codeBlockClasses
    },
    getData() {
      const output = {
        selectors: this.selectors,
        styleFolders: this.styleFolders,
        styleSets: this.styleSets,
        styleSheets: this.styleSheets,
        styleSheetFolders: this.styleSheetFolders,
        // usedClasses: this.usedClasses,
        replaceClasses: this.replaceClasses,
      }
      return output
    },
    setLocalData(data) {
      this.selectors = data.selectors
      this.styleFolders = data.styleFolders
      this.styleSets = data.styleSets
    },
    getLocalData() {
      const output = {
        selectors: this.selectors,
        styleFolders: this.styleFolders,
        styleSets: this.styleSets,
      }
      return output
    },
    getFolderData() {
      //Get stylsets belonging to current folder
      const sSets = this.styleSets.filter(
        (set) => set.parent == this.styleFolders[this.currentFolder].key
      )
      //make an array of styleset names
      let list = []
      sSets.forEach((folder) => {
        list.push(folder.key)
      })
      //get selectors belonging to folder
      const classArray = this.selectors.filter(
        (selector) =>
          selector.parent == this.styleFolders[this.currentFolder].key
      )
      //get custom selectors belonging to any stylset in selected folder
      let customClassArray = this.selectors.filter((selector) => {
        return list.indexOf(selector['set_name']) > -1
      })
      const output = {
        selectors: classArray.concat(customClassArray),
        styleFolders: [this.styleFolders[this.currentFolder]],
        styleSets: sSets,
      }
      return output
    },
    /**
     * Stylesheet actions
     */
    newSsFolder(name, status = 1) {
      this.styleSheetFolders.push({
        folder: 1,
        id: this.idIncrement + 1,
        name: name,
        status: status,
      })
      this.currentStyleSheetFolder = this.styleSheetFolders.length - 1
    },
    deleteSsFolder() {
      this.styleSheets = this.styleSheets.filter((d) => {
        return (
          d.parent !== this.styleSheetFolders[this.currentStyleSheetFolder].id
        )
      })
      this.styleSheetFolders.splice(this.currentStyleSheetFolder, 1)
      //fix error when deleting last item
      if (this.currentStyleSheetFolder >= this.styleSheetFolders.length) {
        this.currentStyleSheetFolder = this.currentStyleSheetFolder - 1
      }
      this.currentStyleSheet = 0
    },
    newStylesheet(name, parent = 0) {
      this.styleSheets.push({
        css: '/*css*/',
        id: this.idIncrement + 1,
        name: name,
        parent: parent,
      })
      this.currentStyleSheet = this.styleSheets.length - 1
    },
    deleteStylesheet() {
      //delete current Stylesheet

      this.styleSheets.splice(this.currentStyleSheet, 1)

      // Set current class to 0 to avoid bugs
      this.currentStyleSheet = 0
    },
    /**
     * Selector Actions
     */
    /**
     *
     * New Selector
     **/
    newSelector(name, type = 'selector') {
      const newSelector = {
        key: name,
        original: {},
        parent: '',
        type: type,
      }
      if (type === 'custom-selector') {
        this.selectors.push(newSelector)
        this.currentClass = [this.selectors.length - 1]
      } else {
        this.selectors.splice(this.selectorEnd, 0, newSelector)
        this.currentClass = [this.selectorEnd - 1]
      }
    },
    /**
     * Delete Selectors
     */
    deleteSelector() {
      //Put currentClasses array in order
      const orderedCurrentClass = this.currentClass.sort(function (a, b) {
        return a - b
      })
      //delete current classes
      for (var i = this.currentClass.length - 1; i >= 0; i--) {
        this.selectors.splice(orderedCurrentClass[i], 1)
      }
      // Set current class to 0 to avoid bugs
      this.currentClass = [0]
    },
    /**
     * Lock Selectors
     */
    lockSelector() {
      if (this.classIsMulti) {
        if (this.isLocked === 'true') {
          this.currentClass.forEach((x) => {
            delete this.selectors[x].original['selector-locked']
          })
        } else {
          this.currentClass.forEach((x) => {
            this.selectors[x].original['selector-locked'] = 'true'
          })
        }
      } else {
        if (this.isLocked === 'true') {
          delete this.selectors[this.currentClass].original['selector-locked']
        } else {
          this.selectors[this.currentClass].original['selector-locked'] = 'true'
        }
      }
    },
    cloneSelector(name) {
      const clone = JSON.parse(
        JSON.stringify(
          this.selectors.slice(this.currentClass[0], this.currentClass[0] + 1)
        )
      )
      clone[0].key = name
      if (clone.type === 'custom-selector') {
        this.selectors.push(clone[0])
        this.currentClass = [this.selectors.length - 1]
      } else {
        this.selectors.splice(this.selectorEnd, 0, clone[0])
        this.currentClass = [this.selectorEnd - 1]
      }
    },
    quarantineSelector() {
      //Get a list of existing folders to check against
      const existingFolders = this.folderList.map((e) => {
        return e.value
      })
      //Get the index of the quarantine folder
      const qIndex = existingFolders.indexOf('Quarantine')

      //if the current class is in quarantine
      if (this.isQuarantined === ('true' || 'mixed')) {
        //Take it out of quarantine
        this.selectedClasses.forEach((x) => {
          this.selectors[x].parent = this.selectors[x].originalFolder
          delete this.selectors[x].originalFolder
        })
        //Check to see if that was the last quarantined selector
        if (this.selectorByFolder('Quarantine').length === 0) {
          //delete the quarantine folder if it was
          this.styleFolders.splice(qIndex)
          // Change the current index to stop things breaking
          if (this.currentFolder >= this.styleFolders.length) {
            this.currentFolder = this.currentFolder - 1
          }
        }
      } else {
        // if there is no Quarantine folder
        if (!existingFolders.includes('Quarantine')) {
          //make one
          this.newFolder('Quarantine', 0)
        }
        //Then add the current class/classes to it
        this.selectedClasses.forEach((x) => {
          this.selectors[x].originalFolder = this.selectors[x].parent
          this.selectors[x].parent = 'Quarantine'
        })
      }
    },
    quarantineUnused() {
      const oxyJSONStore = useOxyJSONStore()
      let toQ = []
      for (var i = 0; i < this.selectors.length; i++) {
        if (oxyJSONStore.getUsedClasses.indexOf(this.selectors[i].key) === -1) {
          if (this.selectors[i].type === 'selector') {
            if (
              this.disabledFolderList.indexOf(this.selectors[i].parent) === -1
            ) {
              toQ.push(i)
            }
          }
        }
      }
      this.currentClass = toQ
      this.quarantineSelector()
      this.currentClass = [0]
    },
    unQuarantineSelectors() {
      let toUnQ = []
      for (var i = 0; i < this.selectors.length; i++) {
        if (this.selectors[i].parent === 'Quarantine') {
          if (this.selectors[i].type === 'selector') {
            toUnQ.push(i)
          }
        }
      }
      this.currentClass = toUnQ
      this.quarantineSelector()
      this.currentClass = [0]
    },
    /**
     * Folder Actions
     */
    newFolder(name, status = 1) {
      this.styleFolders.push({
        key: name,
        status: status,
        type: 'folder',
      })
      this.currentFolder = this.styleFolders.length - 1
    },
    deleteFolder() {
      this.deleteStyleSetsIn(this.styleFolders[this.currentFolder].key)
      this.selectors = this.selectors.filter((d) => {
        return d.parent !== this.styleFolders[this.currentFolder].key
      })
      this.styleFolders.splice(this.currentFolder, 1)
      //fix error when deleting last item
      if (this.currentFolder >= this.styleFolders.length) {
        this.currentFolder = this.currentFolder - 1
      }
    },
    deleteInactive() {
      this.disabledFolderList.forEach((folder) => {
        for (var i = 0; i < this.styleFolders.length; i++) {
          if (this.styleFolders[i].key === folder) {
            this.currentFolder = i
            this.deleteFolder()
          }
        }
      })
    },
    /**
     * Style Set Actions
     */
    newStyleSet(name) {
      this.styleSets.push({
        key: name,
        parent: 'Uncategorized',
        type: 'style-set',
      })
      this.currentStyleSet = this.styleSets.length - 1
      this.typeSelected = 'style-set'
    },
    deleteStyleSet(styleSet = this.styleSets[this.currentStyleSet].key) {
      this.selectors = this.selectors.filter((d) => {
        return d['set_name'] !== styleSet
      })
      const ssIndex = this.styleSets.findIndex((item) => {
        return item.key === styleSet
      })
      this.styleSets.splice(ssIndex, 1)
      //fix error when deleting last item
      if (this.currentStyleSet >= this.styleSets.length) {
        this.currentStyleSet = this.currentStyleSet - 1
      }
    },
    deleteStyleSetsIn(folder) {
      this.styleSetsByFolder(folder).forEach((set) => {
        this.deleteStyleSet(set.key)
      })
    },
  },
  getters: {
    /**
     * Selectors
     */
    selectedClasses: (state) => {
      return state.currentClass.sort(function (a, b) {
        return a - b
      })
    },
    //Returns classes that aren't in a folder
    uncatClasses: (state) => {
      return state.selectors.filter(
        (cClass) =>
          cClass.parent == undefined ||
          (cClass.parent == 'Uncategorized' && cClass.type == 'selector')
      )
    },
    //Returns a list of selectors belonging to a given folder
    selectorByFolder: (state) => {
      return (folder) => {
        const classArray = state.selectors
        return classArray.filter(
          (selector) => selector.parent == folder && selector.type == 'selector'
          // (selector) => selector.parent == folder
        )
      }
    },
    // return false if no selectors are present
    selectorsEmpty: (state) => {
      if (state.selectors.length === 0) {
        return true
      } else {
        return false
      }
    },
    // return the last index of selectors
    selectorEnd: (state) => {
      const selectorOnly = state.selectors.filter((item) => {
        return item.type !== 'custom-selector'
      })
      return selectorOnly.length
    },
    //Returns true if multiple Selectors selected
    classIsMulti: (state) => {
      if (state.currentClass.length > 1) {
        return true
      } else {
        return false
      }
    },
    //Returns true or false depending on locked state
    isLocked: (state) => {
      if (state.selectors.length !== 0) {
        var locked = 'false'
        for (var i = 0; i < state.currentClass.length; i++) {
          if (
            state.selectors[state.currentClass[i]].original[
              'selector-locked'
            ] === 'true'
          ) {
            locked = 'true'
          } else if (locked === 'true') {
            locked = 'mixed'
          }
        }
        return locked
      }
    },
    //Returns true or false if selector is quarantined
    isQuarantined: (state) => {
      if (state.selectors.length !== 0) {
        //Put currentClasses array in order
        const orderedCurrentClass = state.currentClass.sort(function (a, b) {
          return a - b
        })
        var quarantined = 'false'
        for (var i = 0; i < state.currentClass.length; i++) {
          if (state.selectors[orderedCurrentClass[i]].parent === 'Quarantine') {
            quarantined = 'true'
          } else if (quarantined === 'true') {
            quarantined = 'mixed'
          }
        }
        return quarantined
      }
    },
    isDisabled: (state) => {
      if (state.selectors >= 1) {
        if (state.currentClass.length === 1)
          if (state.styleFolders[state.currentFolder].status === 0) {
            return true
          } else {
            return false
          }
      }
    },
    //Returns a list of stylesets belonging to a given folder
    styleSetsByFolder: (state) => {
      return (folder) => {
        const styleSets = state.styleSets
        return styleSets.filter((set) => set.parent == folder)
      }
    },
    //Returns a list of selectors belonging to a given folder
    selectorByStyleSet: (state) => {
      return (folder) => {
        const classArray = state.selectors
        return classArray.filter(
          (selector) =>
            selector.set_name == folder && selector.type == 'custom-selector'
          // (selector) => selector.parent == folder
        )
      }
    },
    //Returns a list of selector folders
    folderList: (state) => {
      let list = []
      state.styleFolders.forEach((folder) => {
        list.push({ value: folder.key, name: folder.key })
      })
      return list
    },
    //Returns a list of disabled folders
    disabledFolderList: (state) => {
      let list = []
      state.styleFolders.forEach((folder) => {
        if (folder.status === 0) {
          list.push(folder.key)
        }
      })
      return list
    },
    //Returns a list of custom selector folders
    styleSetList: (state) => {
      let list = []
      state.styleSets.forEach((folder) => {
        list.push({ value: folder.key, name: folder.key })
      })
      return list
    },
    //Returns a list of Uncategorised custom selector folders
    uncatStyleSets: (state) => {
      return state.styleSets.filter(
        (sSet) => sSet.parent == undefined || sSet.parent == 'Uncategorized'
      )
    },
    /**
     * Stylesheets
     */
    //return an array of stylesheet folders
    SsFolderList: (state) => {
      let list = []
      state.styleSheetFolders.forEach((folder) => {
        list.push({ value: folder.id, name: folder.name })
      })
      return list
    },
    SsListFolder: (state) => {
      return (folder) => {
        const SsArray = state.styleSheets
        return SsArray.filter((sSheet) => sSheet.parent == folder)
      }
    },
    //Returns stylesheets that aren't in a folder
    uncatStylesheets: (state) => {
      return state.styleSheets.filter((cClass) => cClass.parent === 0)
    },
    // return false if no stylesheets are present
    SsEmpty: (state) => {
      if (state.styleSheets.length === 0) return false
      return true
    },
    // return false if no stylesheet folders are present
    SsFoldersEmpty: (state) => {
      if (state.styleSheetFolders.length === 0) return false
      return true
    },
    isSsFolderDisabled: (state) => {
      if (state.styleSheetFolders.length >= 1) {
        if (
          state.styleSheetFolders[state.currentStyleSheetFolder].status === 0
        ) {
          return true
        } else {
          return false
        }
      }
    },
    idIncrement: (state) => {
      const sheets = state.styleSheets.length
      const folder = state.styleSheetFolders.length
      return sheets + folder
    },
    /**
     * Project info
     */
    //Return Selectors that aren't used in the project
    unusedClasses: (state) => {
      let unused = []
      if (state.usedClasses.length !== 0) {
        for (var i = 0; i < state.selectors.length; i++) {
          if (state.usedClasses.indexOf(state.selectors[i].key) === -1) {
            if (state.selectors[i].type === 'selector') {
              if (
                state.disabledFolderList.indexOf(state.selectors[i].parent) ===
                -1
              ) {
                unused.push(state.selectors[i])
              }
            }
          }
        }
      } else {
        unused = state.selectors
      }
      return unused
    },
    //Return Classes in the project that don't have Selector
    missingClasses: (state) => {
      // const oxyJSONStore = useOxyJSONStore()
      var missing = []
      if (state.usedClasses.length !== 0) {
        for (var i = 0; i < state.usedClasses.length; i++) {
          var found = false
          for (var j = 0; j < state.selectors.length; j++) {
            if (state.selectors[j].key == state.usedClasses[i]) {
              found = true
              break
            }
          }
          if (!found) {
            missing.push(state.usedClasses[i])
          }
        }
      }
      return missing
    },
    //Return the number of selectors
    selectorAmt: (state) => {
      let tally = []
      for (var i = 0; i < state.selectors.length; i++) {
        if (state.selectors[i].type === 'selector') {
          tally.push(state.selectors[i])
        }
      }
      return tally.length
    },
    //Return the number of Custom selectors
    customSelectorAmt: (state) => {
      let tally = []
      for (var i = 0; i < state.selectors.length; i++) {
        if (state.selectors[i].type === 'custom-selector') {
          tally.push(state.selectors[i])
        }
      }
      return tally.length
    },
    inactiveSelectors: (state) => {
      let inactive = []
      for (var i = 0; i < state.selectors.length; i++) {
        if (state.disabledFolderList.indexOf(state.selectors[i].parent) > -1) {
          inactive.push(state.selectors[i])
        }
      }
      return inactive
    },
    activeSelectors: (state) => {
      let active = []
      for (var i = 0; i < state.selectors.length; i++) {
        if (
          state.disabledFolderList.indexOf(state.selectors[i].parent) === -1
        ) {
          active.push(state.selectors[i])
        }
      }
      return active
    },
  },
})
