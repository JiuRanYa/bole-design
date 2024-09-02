import type { PropType } from 'vue'
import { booleanProps, buildProps } from '@panda-ui/common'

export type ScrollAreaMode = 'horizontal' | 'vertical'

export interface ScrollAreaEventAlign {
  offsetLength: string
  scroll: string
  scrollLength: string
  length: string
  key: string
  axis: string
  client: string
  direction: string
}

export const scrollAreaProps = buildProps({
  tag: String,
  height: String,
  watchResize: booleanProps,
  viewClass: Array,
  wrapperClass: Array,
  maxHeight: String,
  onScroll: Function as PropType<(state: ScrollAreaEvent) => void>,
  mode: {
    type: String as PropType<ScrollAreaMode>,
    default: 'vertical',
  },
  alwaysShow: booleanProps,
})

export interface ScrollAreaEvent {
  el?: HTMLElement
  originEvent?: Event
  thumbLength: number
  isDragging: boolean
  direction: ScrollDirection
}

export type ScrollDirection = 'backward' | 'forward'

export interface ScrollAreaInstance {
  scrollTo: (option: ScrollToOptions) => void
}
