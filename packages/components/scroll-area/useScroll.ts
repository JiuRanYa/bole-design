import type {
  ExtractPropTypes,
} from 'vue'
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from 'vue'
import { useResizeObserver } from '@panda-ui/hooks'
import { emitEvent } from '@panda-ui/common'
import type { ScrollDirection, scrollAreaProps } from './props'
import { ALIGN_MAP } from './utils'

export function useScroll(props: ExtractPropTypes<typeof scrollAreaProps>) {
  const barRef = ref()
  const viewRef = ref<HTMLElement>()
  const wrapperRef = ref()
  const containerRef = ref()
  const thumbState = reactive({
    offset: 0,
    barOpacity: 0,
    dragging: false,
  })
  const wrapperState = reactive({
    offsetLength: 0,
    scrollLength: 0,
    lastScroll: 0,
    direction: '',
  })

  function handleTrackPointerDown(e: PointerEvent) {
    updateThumbAndWrapperOffset((e as any)[attrAlignMap.value.client])
  }

  function handleThumbPointerDown(e: PointerEvent) {
    // 排除非鼠标左键以及其他非标准触控设备
    if (e.button !== 0)
      return false

    e.stopPropagation()
    e.preventDefault()

    if (!wrapperRef.value || !barRef.value)
      return false

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)

    thumbState.dragging = true
  }

  function updateThumbAndWrapperOffset(currentCursorPos: number) {
    if (!barRef.value || !wrapperRef.value || !thumbSizePixel.value)
      return
    const direction = attrAlignMap.value.direction

    const offset = currentCursorPos - wrapperRef.value.getBoundingClientRect()[direction]
    const halfThumbSize = thumbSizePixel.value / 2
    const thmubStatePercentage = (offset - halfThumbSize) / wrapperState.offsetLength

    const scrollAttr = attrAlignMap.value.scroll
    const scrollLengthAttr = attrAlignMap.value.scrollLength
    const offsetAttr = attrAlignMap.value.offsetLength

    const offsetLength = wrapperRef.value[offsetAttr]
    const scrollLength = wrapperRef.value[scrollLengthAttr]

    const thumbMaxOffset = ((scrollLength - offsetLength) / offsetLength) * 100
    const thumbPatchTop
      = ((thmubStatePercentage * wrapperState.scrollLength) / wrapperState.offsetLength) * 100

    // Outer scroll area ignore case
    if (offset < 0) {
      thumbState.offset = 0
      wrapperRef.value[scrollAttr] = 0
      return
    }
    if (offset + halfThumbSize >= wrapperState.offsetLength) {
      thumbState.offset = thumbMaxOffset
      wrapperRef.value[scrollAttr] = scrollLength
      return
    }

    thumbState.offset = Math.max(0, Math.min(thumbPatchTop, thumbMaxOffset))
    wrapperRef.value[scrollAttr] = thmubStatePercentage * wrapperState.scrollLength
  }

  function handlePointerMove(e: PointerEvent) {
    requestAnimationFrame(() => updateThumbAndWrapperOffset((e as any)[attrAlignMap.value.client]))
  }

  function handlePointerUp(e: PointerEvent) {
    e.preventDefault()
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
    thumbState.dragging = false
  }

  function handleScroll(e: Event) {
    const update = () => {
      if (!barRef.value || !wrapperRef.value)
        return

      const scroll = wrapperRef.value[attrAlignMap.value.scroll]
      const offsetLength = containerRef.value[attrAlignMap.value.offsetLength]

      thumbState.offset = (scroll / offsetLength) * 100

      // 判断滚动方向
      if (scroll > wrapperState.lastScroll)
        wrapperState.direction = 'forward'
      else if (scroll < wrapperState.lastScroll)
        wrapperState.direction = 'backward'

      wrapperState.lastScroll = scroll <= 0 ? 0 : scroll

      props.onScroll
      && emitEvent(props.onScroll, {
        originEvent: e,
        el: wrapperRef.value,
        thumbLength: thumbSizePixel.value!,
        isDragging: thumbState.dragging,
        direction: wrapperState.direction as ScrollDirection,
      })
    }

    requestAnimationFrame(update)
  }

  const thumbSizePercentage = computed(() => {
    if (!wrapperRef.value)
      return

    return (wrapperState.offsetLength / wrapperState.scrollLength) * 100
  })

  const thumbSizePixel = computed(() => {
    if (!wrapperRef.value || !thumbSizePercentage.value)
      return

    return (thumbSizePercentage.value / 100) * wrapperState.offsetLength
  })

  const attrAlignMap = computed(() => {
    return ALIGN_MAP[props.mode]
  })

  function updateDOMState() {
    if (!wrapperRef.value)
      return

    const offsetLength = containerRef.value[attrAlignMap.value.offsetLength]
    const scrollLength = wrapperRef.value[attrAlignMap.value.scrollLength]

    wrapperState.offsetLength = offsetLength
    wrapperState.scrollLength = scrollLength
    thumbState.barOpacity = props.alwaysShow ? 1 : offsetLength === scrollLength ? 0 : 1
  }

  function scrollTo(option: ScrollToOptions) {
    if (!wrapperRef.value.scrollTo)
      return

    wrapperRef.value?.scrollTo(option)
  }

  onMounted(() => {
    nextTick(() => {
      updateDOMState()
    })
  })

  onUpdated(() => {
    updateDOMState()
  })

  watch(
    () => props.watchResize,
    (watchResize) => {
      if (watchResize) {
        nextTick(() => {
          const { observeResize } = useResizeObserver()
          viewRef.value && observeResize(viewRef.value, updateDOMState)
        })
      }
    },
    { immediate: true },
  )

  return {
    barRef,
    viewRef,
    barSizePercentage: thumbSizePercentage,
    thumbState,
    wrapperRef,
    containerRef,
    scrollTo,
    handleScroll,
    handleTrackPointerDown,
    handleThumbPointerDown,
  }
}
