import { useSelectorStore } from '@/store/selectorStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
export default function classCompiler() {
  const selectorStore = useSelectorStore()
  const oxyJSONStore = useOxyJSONStore()

  const extractClasses = (css) => {
    // if css is not an empty string
    let foundClasses = []
    if (css) {
      // find each css class in the string and add to an array  of classes
      const classes = css.match(
        /\.(?![0-9])[a-zA-Z0-9-_]+(?=[\s{)[,*>:+~\]]|$)/g
      )
      // if classes is not empty
      if (classes) {
        // for each class in the array
        classes.forEach((className) => {
          //remove period and spaces
          foundClasses.push(className.replace('.', ''))
        })
      }
    }
    return foundClasses
  }

  return {
    extractClasses,
  }
}
