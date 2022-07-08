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
  const oxyJson = JSON.parse(JSON.stringify(oxyJSONStore.data))

  const compileData = () => {
    let postID
    //search classes in json data
    const searchForClasses = (obj) => {
      //if we have a code block
      if (obj.name === 'ct_code_block') {
        if (
          obj.options.original['code-php'] &&
          obj.options.original['code-php'] !== ''
        ) {
          let uniqueClassNames = []
          //find class attributes in the codeblock
          const classAttr =
            obj.options.original['code-php'].match(/class="(.*?)"/g)
          console.log(classAttr)
          //for each class attribute, find the class names and put the in an array
          if (classAttr) {
            const classNames = classAttr.map((classAttr) =>
              classAttr.match(/class="(.*?)"/)[1].split(' ')
            )
            //flatten the array
            const flatClassNames = classNames.flat()
            //remove duplicates
            uniqueClassNames = [...new Set(flatClassNames)]
          }
          let componentName = obj.options.nicename || obj.options.selector
          uniqueClassNames.forEach((className) => {
            newClassData(postID, obj.name, componentName, className, true)
            if (
              typeof className === 'string' &&
              usedClassList.indexOf(className) === -1
            ) {
              //add it to the usedClassList
              usedClassList.push(className)
              //add it to the codeBlockClasses
              codeBlockClasses.push(className)
            }
          })
        }
      }
      //if the obj has options key
      if (obj.options) {
        //if the options key has classes key
        if (obj.options.classes) {
          let componentName = obj.options.nicename || obj.options.selector
          //for each class in the classes key
          obj.options.classes.forEach((className) => {
            //add to classData
            newClassData(postID, obj.name, componentName, className)
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
    // START OF FUNCTION //
    //for each object in oxyJSON
    Object.keys(oxyJson).forEach((key) => {
      // set post id
      postID = key
      //search for classes in the object
      searchForClasses(oxyJson[key])
    })
    return {
      classDB: classDB,
      usedClassList: usedClassList,
      styleSheetClasses: styleSheetClasses,
      codeBlockClasses: codeBlockClasses,
    }
  }

  const newClassData = (id, component, name, className, CB = false) => {
    let dbEntry = {}
    dbEntry.post_id = id
    dbEntry.component_type = component
    dbEntry.component_name = name
    dbEntry.class_name = className
    dbEntry.phpCode = CB
    classDB.push(dbEntry)
  }

  return {
    compileData,
  }
}
