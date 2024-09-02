import type { Placement } from '@floating-ui/dom'
import { booleanProps, booleanStringProps, buildProps, eventProp } from '@panda-ui/common'
import type { PropType } from 'vue'
import type { TriggerType } from '../tooltip/props'
import type { CascaderKeyConfig, CascaderOption, CascaderOptionState, CascaderValue } from './symbol'

export const cascaderProps = buildProps({
  options: {
    type: Object as PropType<CascaderOption[]>,
  },
  to: booleanStringProps,
  visible: booleanProps,
  briefLabel: booleanProps,
  clearable: booleanProps,
  disabled: booleanProps,
  readonly: booleanProps,
  popperAlive: booleanProps,
  keyConfig: Object as PropType<CascaderKeyConfig>,
  transitionName: String,
  placement: String as PropType<Placement>,
  placeholder: String,
  separator: String,
  value: Array as PropType<CascaderValue>,
  cascadedCount: Number || undefined,
  trigger: String as PropType<TriggerType>,
  onToggle: eventProp<(visible: boolean) => void>(),
  onChange: eventProp<(fullValue: string, option: CascaderOptionState[]) => void>(),
  onSelect: eventProp<(option: CascaderOptionState[]) => void>(),
})
