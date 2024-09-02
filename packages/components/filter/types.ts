import type { ExtractPropTypes, InjectionKey, Ref } from 'vue'

import type { IconName } from '@panda-ui/common'
import type { filterProps } from './props'

export enum InputType {
  INPUT = 'input',
  MULTIINPUT = 'multiInput',
  INPUTNUMBER = 'inputNumber',
  MULTIINPUTNUMBER = 'MultiInputNumber',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  CUSTOM = 'custom',
  BOOLEAN = 'boolean',
  CASCADER = 'cascader',
}

export enum Category {
  PRIMARY = 'primary',
  LOGIGAL = 'logical',
}
export interface Operator {
  label: string
  value: string
  isBetween?: boolean
}

export enum LogicalOperator {
  AND = 'and',
  OR = 'or',
}
export interface Choice {
  value: string
  label: string
}

export interface RuleDataVal {
  category: Category
  operator: Operator
  val: any
  field: string
  label: string
  inputType: InputType
}

export interface RuleData {
  category: Category
  operator: Operator | LogicalOperator
  val: any
  field?: string
  label?: string
  inputType?: InputType
}

export type RuleOption = {
  field: string
  label: string
  inputType: InputType
  operators?: Operator[]
  choices?: Choice[]
  options?: RuleOption[]
  parentField?: string
  validationSchema?: any
  optionProps?: Record<string, any>
} & {
  [key: string]: any
}

export type FilterProps = ExtractPropTypes<typeof filterProps>

export interface Config {
  icon: IconName
  component?: string
}

export const ComponentConfig: Partial<Record<InputType, Config>> = {
  [InputType.INPUT]: { icon: 'text', component: 'InputFilterPanel' },
  [InputType.MULTIINPUT]: { icon: 'regex', component: 'MultiInputFilterPanel' },
  [InputType.DATE]: { icon: 'calendar', component: 'DateFilterPanel' },
  [InputType.CHECKBOX]: { icon: 'circleCheckBig', component: 'CheckboxFilterPanel' },
  [InputType.SELECT]: { icon: 'listChecks', component: 'SelectFilterPanel' },
  [InputType.RADIO]: { icon: 'circle', component: 'RadioFilterPanel' },
  [InputType.CUSTOM]: { icon: 'text' },
  [InputType.BOOLEAN]: { icon: 'checkCheck', component: 'BooleanFilterPanel' },
  [InputType.CASCADER]: { icon: 'listCollapse', component: 'CascaderFilterPanel' },
  [InputType.INPUTNUMBER]: { icon: 'hash', component: 'InputNumberFilterPanel' },
  [InputType.MULTIINPUTNUMBER]: { icon: 'regex', component: 'MultiInputNumberFilterPanel' },
}

export const filterEmits = {
  'update:ruleData': (ruleData: RuleData | null) => ruleData,
}

export interface FilterContext {
  editData: Ref<RuleDataVal | null>
  currentOption: Ref<RuleOption | null>
  setCurrentOption: (option: RuleOption | null) => void
  setEditData: (editData: RuleDataVal | null) => void
  editRule: (rule: RuleDataVal) => void
  addRule: (rule: RuleDataVal) => void
}

export const FILTER_INJECTION_KEY: InjectionKey<FilterContext> = Symbol('filter')
