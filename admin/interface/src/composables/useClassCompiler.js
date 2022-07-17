import { useSelectorStore } from '@/store/selectorStore'
import { useOxyJSONStore } from '@/store/oxyJSONStore'
export default function classCompiler() {
  const selectorStore = useSelectorStore()
  const oxyJSONStore = useOxyJSONStore()

  const extractClasses = (css) => {
    //if css is not empty
    if (css) {
      console.log(css)
    }
    return css
  }

  return {
    extractClasses,
  }
}
