export default function horizontalScroll() {
  const hScroll = (target) => {
    const scrollContainer = document.querySelector(target)
    scrollContainer.addEventListener('wheel', (evt) => {
      evt.preventDefault()
      scrollContainer.scrollLeft += evt.deltaY
    })
  }

  return {
    hScroll,
  }
}
