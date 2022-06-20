import { useSelectorStore } from '@/store/selectorStore'
import { useGlobalStore } from '@/store/globalStore'

export default function cssConstruct() {
  const selectorStore = useSelectorStore()
  const globalStore = useGlobalStore()
  let prefix = false
  const constructCssPreview = (obj) => {
    //If multiple selected - return
    if (selectorStore.classIsMulti == true) return
    //If selectors are empty - return
    if (selectorStore.selectorsEmpty == true) return
    //define prefix - is the seletor custom
    prefix = Object.prototype.hasOwnProperty.call(obj, 'set_name')
    //Flatten data
    const selector = JSON.parse(JSON.stringify(obj))
    //Get selector name
    const className = selector.key
    //create an array containing the states of each screen size
    const constructSelector = (sel) => {
      let media = []
      const full = {}
      //loop through the selector
      for (let key in sel) {
        //if the key is media
        if (key === 'media') {
          //loop through each screen size
          for (let mediaKey in sel[key]) {
            //loop through each media state and prep properties
            Object.keys(sel[key][mediaKey]).forEach((state) => {
              prepState(sel[key][mediaKey][state])
            })
            //push media entry to array
            media.push({ [mediaKey]: sel[key][mediaKey] })
          }
        } else if (
          key !== 'key' &&
          key !== 'parent' &&
          key !== 'type' &&
          key !== 'set_name' &&
          key !== 'friendly_name' &&
          key !== 'originalFolder'
        ) {
          full[key] = prepState(sel[key])
        }
      }
      //put media items in correct order to display
      const mediaOrder = [
        'full',
        'page-width',
        'tablet',
        'phone-landscape',
        'phone-portrait',
      ]
      media = media.sort((a, b) => {
        let aKey = Object.keys(a)[0]
        let bKey = Object.keys(b)[0]
        return mediaOrder.indexOf(aKey) - mediaOrder.indexOf(bKey)
      })
      media.unshift({ full })
      return media
    }
    return formatStyles(className, constructSelector(selector))
  }

  const prepState = (obj) => {
    //for each property
    Object.keys(obj).forEach(function (key) {
      //If a key ends with -unit, it is oxygens unit declaration
      //if value is a number and the key is not 'font-weight - add 'px to the end
      if (/^\d+$/.test(obj[key]) && key !== 'font-weight') {
        obj[key] = obj[key] + 'px'
      }
      if (key.endsWith('-unit')) {
        //create a new key by removing '-unit'
        var newKey = key.replace('-unit', '')
        //add the value of the declaration key to the new key
        obj[newKey] += obj[key]
        //delete the original key
        delete obj[key]
      }
    })
    return obj
  }
  //Disallowed properties
  var disallowed = [
    'font-size-unit',
    'selector-locked',
    'padding-left-unit',
    'padding-right-unit',
    'padding-bottom-unit',
    'padding-top-unit',
    'margin-left-unit',
    'margin-right-unit',
    'margin-bottom-unit',
    'margin-top-unit',
    'container-padding-top-unit',
    'container-padding-bottom-unit',
    'container-padding-left-unit',
    'container-padding-right-unit',
    'border-radius-unit',
    'border-left-width-unit',
    'border-right-width-unit',
    'border-top-width-unit',
    'border-bottom-width-unit',
    'border-all-color',
    'border-all-width',
    'border-all-style',
    'height-unit',
    'width-unit',
    'max-width-unit',
    'letter-spacing-unit',
    'button-text-color',
    // ct_icon related
    'icon-size',
    'icon-style',
    'icon-color',
    'icon-background-color',
    'icon-padding',
    'icon-background-color',
    'box-shadow-color',
    'box-shadow-horizontal-offset',
    'box-shadow-vertical-offset',
    'box-shadow-blur',
    'box-shadow-inset',
    'flex-reverse',
    'button-style',
    'button-color',
    'aos-type',
    'aos-duration',
    'aos-easing',
    'aos-offset',
    'aos-delay',
    'aos-anchor',
    'aos-anchor-placement',
    'aos-once',
    'aos-enable',
    // grid
    'grid-match-height-of-tallest-child',
    'grid-columns-auto-fit',
    'grid-column-count',
    'grid-column-min-width',
    'grid-column-max-width',
    'grid-column-gap',
    'grid-row-count',
    'grid-row-behavior',
    'grid-row-min-height',
    'grid-row-max-height',
    'grid-row-gap',
    'grid-justify-items',
    'grid-align-items',
    'grid',
    'grid-child-rules',
    'grid-all-children-rule',
    // image element
    'image_type',
    'attachment_size',
    // video background
    'video-background',
    'video-background-media',
    'video-background-hide',
    // shadows
    'box-shadow-horizontal-offset',
    'box-shadow-vertical-offset',
    'box-shadow-blur',
    'box-shadow-spread',
    'box-shadow-color',
    'box-shadow-inset',
    'text-shadow-horizontal-offset',
    'text-shadow-vertical-offset',
    'text-shadow-blur',
    'text-shadow-color',
    // filter
    'filter-amount-blur',
    'filter-amount-brightness',
    'filter-amount-contrast',
    'filter-amount-grayscale',
    'filter-amount-hue-rotate',
    'filter-amount-invert',
    'filter-amount-saturate',
    'filter-amount-sepia',
    'filter-amount-blur-unit',
    'filter-amount-brightness-unit',
    'filter-amount-contrast-unit',
    'filter-amount-grayscale-unit',
    'filter-amount-hue-rotate-unit',
    'filter-amount-invert-unit',
    'filter-amount-saturate-unit',
    'filter-amount-sepia-unit',
    // background related
    'gradient',
    'background',
    'overlay-color',
    'overlay-color',
    'background-position-left',
    'background-position-top',
    'background-size-width',
    'background-size-height',
    'container-padding-top',
    'container-padding-right',
    'container-padding-bottom',
    'container-padding-left',
    'section-width',
    'custom-width',
    'header-width',
    'header-custom-width',
    'header-row-width',
    'header-row-custom-width',
    'ct-content',
    'custom-css',
    'custom-js',
    'code-css',
    'code-php',
    'code-js',
    // ct_video related
    'video-padding-bottom',
    'use-custom',
    'custom-code',
    'embed-src',
    // ct_link_button related
    'button-style',
    'button-size',
    'button-color',
    'button-text-color',
    'tag',
    //to fix
    'font-family',
  ]

  const formatStyles = (className, styles, type) => {
    let cssString = ''
    styles.forEach((style) => {
      const screenSize = Object.keys(style)[0]
      let rule = ''
      let states
      //fix state order
      if (screenSize !== 'full') {
        states = Object.keys(style[screenSize])
      } else {
        states = Object.keys(style[screenSize])
        states = states.reverse()
      }
      //loop through each state
      states.forEach((state) => {
        const currentState =
          state === 'original' ? className : `${className}:${state}`
        rule += `${prefix ? '' : '.'}${currentState}{\n`
        //loop through each property

        Object.keys(style[screenSize][state]).forEach((property) => {
          if (property == 'custom-css') {
            rule += `${style[screenSize][state][property]
              .split(';')
              .join(';\n')}`
          } else if (disallowed.indexOf(property) === -1) {
            rule += `${screenSize !== 'full' ? '    ' : '  '}${property}: ${
              style[screenSize][state][property]
            };\n`
          }
        })
        rule += `${screenSize !== 'full' ? '  ' : ''}}\n`
      })
      if (screenSize !== 'full') {
        cssString += `@media (max-width: ${globalStore.screenSize(
          screenSize
        )}px){\n`
        cssString += ` ${rule}`
        cssString += '}\n'
      } else {
        cssString += rule
      }
    })
    return cssString
  }
  return {
    constructCssPreview,
  }
}
