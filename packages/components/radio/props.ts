import { booleanProps, buildProps, valueProp } from '@panda-ui/common'

export const radioCommonProps = {
  value: valueProp,
  disabled: booleanProps,
}
export const radioProps = buildProps({
  ...radioCommonProps,
  label: String,
})

export const radioGroupProps = buildProps({
  ...radioCommonProps,
  vertical: booleanProps,
})
