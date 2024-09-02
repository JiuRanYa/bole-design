import type { PropType } from 'vue'
import type { SelectValue } from '../select/.symbol'

export interface RawOption<T = any> {
  value: T
  label: string
  disabled?: boolean
}

export interface SelectOption<T = any> extends Partial<RawOption<T>> {
  created?: boolean
}

export const optionProps = Object.freeze({
  value: {
    type: [String, Number, Array] as PropType<SelectValue>,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  noTitle: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  onSelect: Function,
  expandable: {
    type: Boolean,
  },
})
