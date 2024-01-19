import {
  nextTick,
  ExtractPropTypes,
  ref,
  reactive,
  computed,
  onMounted,
  watch,
  onUpdated
} from 'vue'
import { scrollAreaProps } from './props'
import { useResizeObserver } from '@panda-ui/hooks'

export function useScroll(props: ExtractPropTypes<typeof scrollAreaProps>) {
  const barRef = ref()
  const viewRef = ref<HTMLElement>()
  const wrapperRef = ref<HTMLElement>()
  const thumbState = reactive({
    top: 0,
    barOpacity: 0,
    dragging: false
  })
  const wrapperState = reactive({
    offsetHeight: 0,
    scrollHeight: 0
  })

  function handleTrackPointerDown(e: PointerEvent) {
    updateThumbAndWrapperTop(e.clientY)
  }

  function handleThumbPointerDown(e: PointerEvent) {
    // 排除非鼠标左键以及其他非标准触控设备
    if (e.button !== 0) {
      return false
    }

    e.stopPropagation()
    e.preventDefault()

    if (!wrapperRef.value || !barRef.value) return false

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)

    thumbState.dragging = true
  }

  function updateThumbAndWrapperTop(currentCursorPos: number) {
    if (!barRef.value || !wrapperRef.value || !thumbSizePixel.value) return

    const offset = currentCursorPos - wrapperRef.value.getBoundingClientRect()['top']
    const halfThumbSize = thumbSizePixel.value / 2
    const thmubStatePercentage = (offset - halfThumbSize) / wrapperState.offsetHeight

    const { scrollHeight, offsetHeight } = wrapperRef.value
    const thumbMaxTop = ((scrollHeight - offsetHeight) / offsetHeight) * 100
    const thumbPatchTop =
      ((thmubStatePercentage * wrapperState.scrollHeight) / wrapperState.offsetHeight) * 100

    // Outer scroll area ignore case
    if (offset < 0) {
      thumbState.top = 0
      wrapperRef.value.scrollTop = 0
      return
    }
    if (offset + halfThumbSize >= wrapperState.offsetHeight) {
      thumbState.top = thumbMaxTop
      wrapperRef.value.scrollTop = scrollHeight
      return
    }

    thumbState.top = Math.max(0, Math.min(thumbPatchTop, thumbMaxTop))
    wrapperRef.value.scrollTop = thmubStatePercentage * wrapperState.scrollHeight
  }

  function handlePointerMove(e: PointerEvent) {
    requestAnimationFrame(() => updateThumbAndWrapperTop(e.clientY))
  }

  function handlePointerUp(e: PointerEvent) {
    e.preventDefault()
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
    thumbState.dragging = false
  }

  function handleScroll() {
    const update = () => {
      if (!barRef.value || !wrapperRef.value) return

      const { scrollTop, offsetHeight } = wrapperRef.value

      thumbState.top = (scrollTop / offsetHeight) * 100
    }

    requestAnimationFrame(update)
  }

  const thumbSizePercentage = computed(() => {
    if (!wrapperRef.value) return

    return (wrapperState.offsetHeight / wrapperState.scrollHeight) * 100
  })

  const thumbSizePixel = computed(() => {
    if (!wrapperRef.value || !thumbSizePercentage.value) return

    return (thumbSizePercentage.value / 100) * wrapperState.offsetHeight
  })

  function updateDOMState() {
    if (!wrapperRef.value) return

    wrapperState.offsetHeight = wrapperRef.value.offsetHeight
    wrapperState.scrollHeight = wrapperRef.value.scrollHeight
    thumbState.barOpacity = wrapperRef.value.offsetHeight === wrapperRef.value.scrollHeight ? 0 : 1
  }

  function scrollTo(option: ScrollToOptions) {
    wrapperRef.value?.scrollTo(option)
  }

  onMounted(() => {
    updateDOMState()
  })

  onUpdated(() => {
    updateDOMState()
  })

  watch(
    () => props.watchResize,
    watchResize => {
      if (watchResize) {
        nextTick(() => {
          const { observeResize } = useResizeObserver()
          viewRef.value && observeResize(viewRef.value, updateDOMState)
        })
      }
    },
    { immediate: true }
  )

  return {
    barRef,
    viewRef,
    barSizePercentage: thumbSizePercentage,
    thumbState,
    wrapperRef,
    scrollTo,
    handleScroll,
    handleTrackPointerDown,
    handleThumbPointerDown
  }
}
