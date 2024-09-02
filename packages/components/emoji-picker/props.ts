import { buildProps } from '@panda-ui/common'
import type { PropType } from 'vue'
import { dropdownProps } from '../dropdown/props'

export const emojiPickerProps = buildProps({
  ...dropdownProps,
  value: Object as PropType<InnerEmoji>,
  size: Number,
  onSelect: Function as PropType<(emoji: Emoji) => void>,
})

export interface InnerEmoji {
  n: string[]
  u: string
  a: string
}

export interface Emoji {
  n: string[]
  u: string
  a: string
  parsed?: string
}
