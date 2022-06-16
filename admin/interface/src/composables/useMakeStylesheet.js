import { useFontStore } from '@/store/fontStore'
import { computed } from 'vue'

export default function makeStyleSheet() {
  const fontStore = useFontStore()

  const fontClamp = () => {
    let entries = []
    const maxScreen = (1 / 16) * fontStore.screenMax
    const minScreen = (1 / 16) * fontStore.screenMin

    fontStore.fonts.forEach((font) => {
      let max
      let min
      switch (fontStore.fontUnitIsRem) {
        case true:
          max = font.max * 1
          min = font.min * 1

          break
        case false:
          max = font.max / 16
          min = font.min / 16

          break
      }
      const slope = (max - min) / (maxScreen - minScreen)
      const intersect = -1 * minScreen * slope + min
      const step = `${intersect.toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw)`

      entries.push(`${font.var}: clamp(${min}rem, ${step}, ${max}rem);`)
    })
    return entries.join('<br>')
  }

  const fontFixed = () => {
    let entries = []
    fontStore.fonts.forEach((font) => {
      let max

      switch (fontStore.fontUnitIsRem) {
        case true:
          max = font.max * 1

          break
        case false:
          max = font.max / 16

          break
      }

      entries.push(`${font.var}${fontStore.fixedIdentity}: ${max}rem;`)
    })
    return entries.join('<br>')
  }
  const fontStyles = computed(() => {
    let sheet = []
    if (fontStore.hasFixed) sheet.push('/* Fixed Font Sizes */')
    if (fontStore.hasFixed) sheet.push(fontFixed())
    sheet.push('/* Fluid Font Sizes */')
    sheet.push(fontClamp())
    sheet.unshift('root:{')
    sheet.push('}')
    return sheet.join('<br>')
  })

  return {
    fontStyles,
  }
}
