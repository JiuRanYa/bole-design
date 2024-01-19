import { booleanProps, buildProps } from '@panda-ui/common'
import { ExtractPropTypes, PropType } from 'vue'
import { PanelDirection } from './types'

export const panelGroupProps = buildProps({
  direction: {
    type: String as PropType<PanelDirection>
  },
  grid: booleanProps,
  disabled: booleanProps,
  layout: Array as PropType<number[]>,
  gridLayout: Array as PropType<number[]>
})

export type PanelGroupProps = ExtractPropTypes<typeof panelGroupProps>
