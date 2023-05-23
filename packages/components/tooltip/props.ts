import { buildProps, booleanStringProp } from '@bole-design/common'

export const toolTipProps = buildProps({
  content: String,
  // popper包裹的元素类型, 为ture时默认为span
  wrap: booleanStringProp
})
