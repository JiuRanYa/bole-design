import { buildProps } from '@bole-design/common/props'
import { booleanProps } from '@bole-design/common'

export const inputProps = buildProps({
  value: String,
  debounce: booleanProps,
	placeholder: String
})
