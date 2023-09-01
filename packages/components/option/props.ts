export type RawOption = string | Record<string, any>

export const optionProps = Object.freeze({
  value: {
    type: [String, Number],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  noTitle: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  onSelect: Function
})
