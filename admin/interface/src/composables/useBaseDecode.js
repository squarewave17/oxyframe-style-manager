import { useSelectorStore } from '@/store/selectorStore'
export default function baseDecode() {
  const selectorStore = useSelectorStore()

  const decodeStyle = (input) => {
    if (input)
      input.forEach((obj) => {
        if (obj.css) {
          obj.css = atob(obj.css)
        }
      })
    return input
  }
  const encodeStyle = (input) => {
    if (input)
      input.forEach((obj) => {
        if (obj.css) {
          // obj.css = btoa(obj.css)
          obj.css = btoa(unescape(encodeURIComponent(obj.css)))
        }
      })
    return input
  }
  return {
    decodeStyle,
    encodeStyle,
  }
}
