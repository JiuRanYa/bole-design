import type { ExtractPropTypes, PropType } from 'vue'
import type { ClassType, StyleType } from '@panda-ui/common'
import { buildProps } from '@panda-ui/common'

export const iconProp = [Object, Function, String]

export type IconPresetEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out'
// eslint-disable-next-line ts/ban-types
export type IconEffect = IconPresetEffect | (string & {})

export interface IconBaseProps {
  icon: Record<string, any>
  class?: ClassType
  style?: StyleType
  scale?: number | string
  title?: string
  label?: string
  flip?: 'horizontal' | 'vertical' | 'both'
  effect?: IconEffect
  size?: string
  color?: string
  rotate?: number | string
}

export type IconRenderer = (
  props: IconBaseProps,
  attrs: Record<string, any>,
  renderDefault: () => any
) => any

export const iconProps = buildProps({
  icon: iconProp,
  scale: [Number, String],
  title: String,
  label: String,
  flip: String as PropType<'horizontal' | 'vertical' | 'both'>,
  effect: String as PropType<IconEffect>,
  size: String,
  color: String,
  rotate: [Number, String],
  renderer: Function as PropType<IconRenderer>,
})

export type IconProps = ExtractPropTypes<typeof iconProps>
