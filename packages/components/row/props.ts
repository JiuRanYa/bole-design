import { booleanProps, buildProps } from '@bole-design/common'
import { PropType } from 'vue'

export type AlignType =
  | 'top'
  | 'middle'
  | 'bottom'
  | 'stretch'
  | {
      [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']:
        | 'top'
        | 'middle'
        | 'bottom'
        | 'stretch'
    }

export type JustifyType =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
  | {
      [key in 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl']:
        | 'start'
        | 'end'
        | 'center'
        | 'space-around'
        | 'space-between'
        | 'space-evenly'
    }

export const rowProps = buildProps({
  align: {
    default: 'top',
    type: String as PropType<AlignType>,
  },
  justify: booleanProps,
  gap: [Number, Array] as PropType<Number | Number[]>,
  tag: String,
})
