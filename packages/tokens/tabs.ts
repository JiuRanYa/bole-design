import { InjectionKey } from 'vue'

export interface TabsContext {
  props: {
    value?: string
  }
  changeTab: (tabName: string) => void
}
export const tabsContextKey: InjectionKey<TabsContext> = Symbol('BlTabs')
