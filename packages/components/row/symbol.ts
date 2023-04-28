import type { InjectionKey } from 'vue'

export interface RowState {
  gap: number | number[]
}

export const ROW_STATE: InjectionKey<RowState> = Symbol('RowState')
