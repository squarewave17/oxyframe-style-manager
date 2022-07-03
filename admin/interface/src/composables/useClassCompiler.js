import { useSelectorStore } from '@/store/selectorStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
export default function classCompiler() {
  const selectorStore = useSelectorStore()
  const oxyJSONStore = useOxyJSONStore()
  // DB for all class instances and info
  let classDB = []
  // Array of classes present in selectors, stylesheets and codeblocks
  let usedClassList = []
  // present classes in stylesheets
  let styleSheetClasses = []
  //present classes in code blocks
  let codeBlockClasses = []

  const compile = () => {
    const oxyJson = JSON.parse(JSON.stringify(oxyJSONStore.data))

    let postID
    //search classes in json data
    const searchForClasses = (obj) => {
      //if the obj has options key
      if (obj.name === 'ct_code_block') {
        extractClassesFromCB(obj)
      }
      if (obj.options) {
        //if the options key has classes key
        if (obj.options.classes) {
          let componentName = obj.options.nicename || obj.options.selector
          //for each class in the classes key
          obj.options.classes.forEach((className) => {
            let dbEntry = {}
            dbEntry.post_id = postID
            dbEntry.component_type = obj.name
            dbEntry.component_name = componentName
            dbEntry.class_name = className
            classDB.push(dbEntry)
            // searchStyleSheets(className)
            //if the class is a string and not already in the usedClassList
            if (
              typeof className === 'string' &&
              usedClassList.indexOf(className) === -1
            ) {
              //add it to the usedClassList
              usedClassList.push(className)
            }
            //create an object containing className
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
    // extract classes found in php codeblocks
    const extractClassesFromCB = (obj) => {
      if (
        obj.options.original['code-php'] &&
        obj.options.original['code-php'] !== ''
      ) {
        let found = []
        obj.options.original['code-php'].replace(/class="(.*?)"/g, (match) => {
          found.push(
            match.replace('class=', '').replace('"', '').replace('"', '')
          )
        })
        let componentName = obj.options.nicename || obj.options.selector
        found.forEach((className) => {
          let dbEntry = {}
          dbEntry.post_id = postID
          dbEntry.component_type = obj.name
          dbEntry.component_name = componentName
          dbEntry.phpCode = true
          dbEntry.class_name = className
          classDB.push(dbEntry)
          if (
            typeof className === 'string' &&
            usedClassList.indexOf(className) === -1
          ) {
            //add it to the usedClassList
            usedClassList.push(className)
          }
        })
      }
      // process and css blocks found in codeblocks
      if (
        obj.options.original['code-css'] &&
        obj.options.original['code-css'] !== ''
      ) {
        cssParse(obj.options.original['code-css'], 'codeBlock')
      }
    }
    //for each object in state.data
    Object.keys(oxyJson).forEach((key) => {
      // set post id
      postID = key
      //search for classes in the object
      searchForClasses(oxyJson[key])
    })
    compilePresent()
    //return the usedClassList
    let data = {
      usedClassData: classDB,
      usedClassList: usedClassList,
      styleSheetClasses: styleSheetClasses,
      codeBlockClasses: codeBlockClasses,
    }
    return data
  }

  const compilePresent = () => {
    let classes = []
    const styleSheetClasses = () => {
      const selectorStore = useSelectorStore()
      //for each item in selectorStore.styleSheets
      selectorStore.styleSheets.forEach((styleSheet) => {
        styleSheet = JSON.parse(JSON.stringify(styleSheet))
        classes.push(cssParse(styleSheet.css, 'styleSheet'))
      })
      return classes
    }

    return styleSheetClasses()
  }

  const cssParse = (styleSheet, type) => {
    let classes = []
    //remove everything between { and }
    styleSheet = styleSheet.replace(/{[\s\S]*?}|\/\*[\s\S]*?\*\//g, '')
    styleSheet.replace(
      /\.(?![0-9])[a-zA-Z0-9-_]+(?=[\s{)[,*>:+~\]])/g,
      (match) => {
        classes.push(match.replace('.', ''))
      }
    )
    classes.forEach((className) => {
      if (
        type === 'styleSheet' &&
        styleSheetClasses.indexOf(className) === -1
      ) {
        //add it to the usedClassList
        styleSheetClasses.push(className)
      }
      if (type === 'codeBlock' && codeBlockClasses.indexOf(className) === -1) {
        //add it to the usedClassList
        codeBlockClasses.push(className)
      }
    })
  }

  return {
    compile,
  }
}
