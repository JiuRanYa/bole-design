import { ComputedRef, InjectionKey } from 'vue'

export interface RootContext {
  hasSidebar: ComputedRef<boolean>
}
export const rootKey: InjectionKey<RootContext> = Symbol('BlDocsRoot')
