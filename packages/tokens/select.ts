import { SelectContext } from '@bole-design/components/select/props'
import { InjectionKey } from 'vue'

export const selectKey: InjectionKey<SelectContext> = Symbol('BlSelect')
