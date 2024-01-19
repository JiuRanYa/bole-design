import { InjectionKey, ExtractPropTypes } from 'vue'
import {
  TypeTextM,
  TypeCustomTextM,
  TypeDateM,
  TypeListM,
  TypeCustomListM,
  CustomSegmentsM,
  TypeBooleanM
} from '@panda-ui/icons'
import { filterProps } from './props'

export enum InputType {
  INPUT = 'input',
  MULTIINPUT = 'multiInput',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  CUSTOM = 'custom',
  BOOLEAN = 'boolean'
}

export type Operator = {
  label: string
  value: string
  isBetween?: boolean
}

export type Choice = {
  val: string
  label: string
}

export type RuleData = {
  field: string
  label: string
  operator: Operator
  value: string | number | boolean | any[]
  inputType: InputType
} & {
  [key: string]: any
}

export type RuleOption = {
  field: string
  label: string
  inputType: InputType
  operators?: Operator[]
  choices?: Choice[]
  options?: RuleOption[]
  parentField?: string
} & {
  [key: string]: any
}

export type FilterProps = ExtractPropTypes<typeof filterProps>

export type Config = {
  icon: object
  component?: string
}
export interface ComponentConfig {
  [key: string]: Config
}

export const ComponentConfig: ComponentConfig = {
  [InputType.INPUT]: { icon: TypeTextM, component: 'InputFilterPanel' },
  [InputType.MULTIINPUT]: { icon: TypeCustomTextM, component: 'MultiInputFilterPanel' },
  [InputType.DATE]: { icon: TypeDateM, component: 'DateFilterPanel' },
  [InputType.CHECKBOX]: { icon: TypeListM, component: 'CheckboxFilterPanel' },
  [InputType.SELECT]: { icon: TypeCustomListM, component: 'SelectFilterPanel' },
  // [RadioComponent.RADIO]: { icon: TypeBooleanM, component: 'RadioFilterPanel' },
  [InputType.CUSTOM]: { icon: CustomSegmentsM },
  [InputType.BOOLEAN]: { icon: TypeBooleanM, component: 'BooleanFilterPanel' }
}

export const filterEmits = {
  'update:rules': (rules: RuleData[]) => rules
}

export type FilterContext = {
  editData: RuleData | null
  currentOption: RuleOption
  editRule: (rule: RuleData) => void
  addRule: (rule: RuleData) => void
  setCurrentOption: (option: RuleOption) => void
  setEditData: (editData: RuleData | null) => void
}

export const FILTER_INJECTION_KEY: InjectionKey<any> = Symbol()

export const DATEFORMAT = 'YYYY-MM-DD'
export const DATETIMEFORMAT = 'YYYY-MM-DD mm:ss'
