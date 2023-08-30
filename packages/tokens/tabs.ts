import { InjectionKey } from 'vue'

export interface TabsContext {
  props: {
    value?: string
  }
}
export const tabsContextKey: InjectionKey<TabsContext> = Symbol('BlTabs')
