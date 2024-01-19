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

export type FilterGroupItem = {
  rules: RuleData[]
  visible: boolean
  readonly?: boolean
}
