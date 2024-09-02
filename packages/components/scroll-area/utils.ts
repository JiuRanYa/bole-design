import type { ScrollAreaEventAlign, ScrollAreaMode } from './props'

// 用Map来代替直接属性，避免在取值时频繁判断mode
export const ALIGN_MAP: {
  [k in ScrollAreaMode]: Record<keyof ScrollAreaEventAlign, keyof HTMLElement | string>
} = {
  vertical: {
    offsetLength: 'offsetHeight',
    scroll: 'scrollTop',
    scrollLength: 'scrollHeight',
    length: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offsetLength: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollLength: 'scrollWidth',
    length: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
}
