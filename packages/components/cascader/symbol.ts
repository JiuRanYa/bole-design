export interface CascaderOption {
  label: string
  value: any
  disabled?: boolean
  children?: CascaderOption[]
}

export type CascaderValue = (string | number)[] | (string | number)[][]

export interface CascaderKeyConfig {
  value?: string
  label?: string
  children?: string
  disabled?: string
  hasChild?: string
}

export interface CascaderOptionState {
  id: number
  parent: number
  value: string | number
  fullValue: string
  label: string
  fullLabel: string
  children: CascaderOptionState[]
  disabled: boolean
  hasChild: boolean
  checked: boolean
  data: Record<string, any>
}
