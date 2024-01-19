import { buildProps } from '@panda-ui/common'
import { dropdownProps } from '../dropdown/props'
import { PropType } from 'vue'

export const emojiPickerProps = buildProps({
  ...dropdownProps,
  value: Object as PropType<InnerEmoji>,
  size: Number,
  onSelect: Function as PropType<(emoji: Emoji) => void>
})

export type InnerEmoji = {
  n: string[]
  u: string
  a: string
}

export type Emoji = {
  n: string[]
  u: string
  a: string
  parsed: string
}
